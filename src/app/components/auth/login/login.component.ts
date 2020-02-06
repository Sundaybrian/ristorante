import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private flash: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
    // force user back to dashboard if they try to access login page
    // this.authService.getAuth().subscribe(
    //   auth => {
    //     if (auth) {
    //      this.router.navigate(['/']);
    //     }
    //   }
    // );
  }

  onSubmit() {
    // call the login method to login a user
    // later on it will extended to check on the user type
    this.authService.login(this.email, this.password).then(response => {
      // this.flash.show('Login Succesfully', {
      //   cssClass: 'alert-success', timeout: 4000
      // });
      // this.router.navigate(['/']);
      const uid = response['user'].uid;

      this.afterSignIn(uid);

    }).catch(err => {
      this.flash.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }


  afterSignIn(uid) {
    // check type of user and redirect accordingly
    const client = this.clientService.get(uid);
    client.valueChanges().subscribe(user => {
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
