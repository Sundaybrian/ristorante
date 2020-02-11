import { Component, OnInit, OnDestroy } from "@angular/core";
import { ClientService } from "src/app/services/client.service";
import { AuthService } from "src/app/services/auth.service";
import { Client } from "src/app/models/Clients";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit, OnDestroy{
  client: Client;
  client$: Subscription;
  id: string;

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {
     // fetching user id
     this.id = this.authService.getUserID();

     // get user data
     this.client$ = this.db
       .object("/users/clients/" + this.id).snapshotChanges().subscribe(action => {
         const data = action.payload.val() as Client;
         // data.key = action.key;
         console.log(data);

         this.client = data;

       });
  }

  ngOnInit() {

  }

  ngOnDestroy() {

    this.client$.unsubscribe();
  }
}
