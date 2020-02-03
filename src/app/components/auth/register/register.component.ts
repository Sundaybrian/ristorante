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

  onSubmit({value , valid}: { value: Partial<Client>, valid: boolean}) {

    console.log(value);

    // call the register method to register a user
    // later on it will extended to check on the user type
    this.authService.register(this.email, this.password).then(response => {
      this.flash.show('You are now registered and logged in', {
        cssClass: 'alert-success', timeout: 4000
      });

      // hijack the value to pass the isActive and isVendor value
      value.key = this.afAuth.auth.currentUser.uid;
      value.balance = 0;
      value.email = this.afAuth.auth.currentUser.email;
      value.isVendor = true;
      value.isActive = false;

      // create a client
      this.clientService.newClient2(value.key, value);

      // navigate to homepage
      this.router.navigate(['/']);
    }).catch(err => {
      this.flash.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }


}
