import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { ClientService } from './client.service';
import { Router } from '@angular/router';
import { Client } from '../models/Clients';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  userObj: Client;

  constructor(
    private afAuth: AngularFireAuth,
    public clientService: ClientService,
    public router: Router

  ) {
    this.user$ = afAuth.authState;
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then( userData => resolve(userData),
      err => reject(err));
    });
  }

  register(email: string, password: string) {
    // method to register a vendor
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then( userData => resolve(userData),
      err => reject(err));
    });
  }

  getAuth() {
    // return authstate if user is logged in
    // null if user is not logged in
    // user : firebase.User if logged in
    return this.afAuth.authState;
  }


  logout() {
    // logout a user
    this.afAuth.auth.signOut();
  }


  afterSignIn(uid) {
    // check type of user and redirect accordingly
    const client = this.clientService.get(uid);
    client.valueChanges().subscribe(user => {
      // saving user data to userObj,who knows a neeed might arise
      this.userObj = user;
      if ( user["isAdmin"] == true) {
        // is admin to homepage
        this.router.navigate(['/']);
      } else {
        // is vendor to vendor profile page
        this.router.navigate(['/vendors/profile/' + uid]);
      }

    });
  }
}
