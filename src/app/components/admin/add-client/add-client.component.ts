import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../../models/Clients';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';


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

@ViewChild('clientForm', {static: false}) form: any;

  constructor(
    private flash: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    // value is the form field in an obj
    if (this.disableBalanceOnAdd) {
      // add the balance to the value object since it is not there if disablebalace is true
      value.balance = 0;
    }

    // hijack the value to pass the isActive and isVendor value
    value.isActive = false;
    value.isVendor = true;

    // add new client
    this.clientService.newClient(value);

    // show flash message
    this.flash.show('Client created successfully', {
      cssClass: 'alert-success', timeout: 4000
    });
    // redirect to dashboard
    this.router.navigate(['/']);

  }

}
