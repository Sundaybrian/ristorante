import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../../../models/Clients';
import { Router, ActivatedRoute , Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
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
  clientRef: any;
  disableBalanceOnEdit = true;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flash: FlashMessagesService,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    // Get id from ur
    this.id = this.route.snapshot.params['id'];

    // Get the client associated with the id
    this.getClient(this.id);

  }

  getClient(id: string) {
    this.clientRef = this.db.object('/users/clients/' + id);

    this.clientRef.snapshotChanges().subscribe(action => {
      const data = action.payload.val() as Client;
      data.key = action.key;

      this.client = data;

    });

  }

  onSubmit({value, valid}: {value: Client, valid: booleab}) {
    
  }

}
