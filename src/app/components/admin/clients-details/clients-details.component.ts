import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../../../models/Clients';
import { Router, ActivatedRoute , Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
// import 'rxjs/add/operator/take';


@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css']
})
export class ClientsDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flash: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from ur
    this.id = this.route.snapshot.params['id'];

    // Get the client associated with the id
    this.client = this.clientService.getClient(this.id);

    // set balance
    if (this.client.balance > 0) {
      this.hasBalance = true;

    }
  

  }



}
