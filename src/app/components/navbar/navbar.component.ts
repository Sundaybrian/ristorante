import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Observable } from "rxjs";
import * as firebase from "firebase";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  currentUser$: Observable<firebase.User>;
  showRegister: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flash: FlashMessagesService
  ) {}

  ngOnInit() {
    this.currentUser$ = this.authService.getAuth();
    if (this.currentUser$) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  onLogoutClick() {
    // method to logout a user
    this.authService.logout();
    this.flash.show('You are now logged out', {
      cssClass: 'alert-success',
      timeout: 4000
    });
    this.router.navigate(['/login']);
  }
}
