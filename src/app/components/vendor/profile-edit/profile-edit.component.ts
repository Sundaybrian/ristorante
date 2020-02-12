import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from 'src/app/models/Clients';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit,OnDestroy {
  id: string;
  client: Partial<Client> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
    businessLocation: '',
    businessName: '',
    isActive: false,
    isVendor: true
  };

  client$: Subscription;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flash: FlashMessagesService,
    private db: AngularFireDatabase
  ) {
    // Get id from url
    this.id = this.route.snapshot.params['id'];

    // get the client associated with the id
    this.client$ = this.db.object('/users/clients/' + this.id).snapshotChanges().subscribe(
      action => {
        const data = action.payload.val() as Client;
        this.client = data;
      }
    );
   }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.client$.unsubscribe();
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    // add client id
    value.key = this.id

    // update the vendor
    this.clientService.updateClient(value);

    // show flash message
    this.flash.show('Your Details have been updated', {
      cssClass: 'alert-success', timeout: 4000
    });

    // navigate to vendor details
    this.router.navigate(['/vendor/profile']);
  }

}
