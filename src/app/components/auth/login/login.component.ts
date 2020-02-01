import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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
    private flash: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
    // force user back to dashboard if they try to access login page
    this.authService.getAuth().subscribe(
      auth => {
        if (auth) {
         this.router.navigate(['/']);
        }
      }
    );
  }

  onSubmit() {
    // call the login method to login a user
    // later on it will extended to check on the user type
    this.authService.login(this.email, this.password).then(response => {
      this.flash.show('Login Succesfully', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }).catch(err => {
      this.flash.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }

}
