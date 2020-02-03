import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Clients';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  client: Client;

  constructor(
    private authService: AuthService,
    private flash: FlashMessagesService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private clientService: ClientService
  ) { }

  ngOnInit() {
  }

  onSubmit() {

    // call the register method to register a user
    // later on it will extended to check on the user type
    this.authService.register(this.email, this.password).then(response => {
      this.flash.show('You are now registered and logged in', {
        cssClass: 'alert-success', timeout: 4000
      });
    

      // send verification email to the now logged in user
      // this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      //   this.flash.show('Check your email to verify your account', {
      //     cssClass: 'alert-success', timeout: 4000
      //   });
      // }).catch(err => {
      //   this.flash.show(err.message, {
      //     cssClass: 'alert-danger', timeout: 4000
      //   });
      // });

      // navigate to homepage
      this.router.navigate(['/']);
    }).catch(err => {
      this.flash.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }


}
