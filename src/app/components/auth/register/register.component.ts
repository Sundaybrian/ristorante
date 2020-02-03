import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flash: FlashMessagesService,
    private router: Router,
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
      this.router.navigate(['/']);
    }).catch(err => {
      this.flash.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }


}
