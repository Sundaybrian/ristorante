import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/Clients';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
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

// blur field to adding a balance when creating a new client
disableBalanceOnAdd = true;

  constructor() { }

  ngOnInit() {
  }

}
