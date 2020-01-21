import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Clients';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
        this.getTotalOwed();
        console.log(this.clients);
      }
    );

  }

  getTotalOwed() {
    // method to calculate balance owed
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + client.balance;
    }, 0);
  }

}
