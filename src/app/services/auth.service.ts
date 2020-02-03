import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,

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
}
