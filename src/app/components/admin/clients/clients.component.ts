import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Clients';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwed: number;
  tableResource: DataTableResource<Client>;
  items: Client[] = [];
  itemCount: number;

  constructor(private clientService: ClientService) {
    // initiliaze datatable resource with the clients
    this.initializeTable(this.clients);

  }

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
    // initial total is zero,loop against each cleint sium
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);
  }

  filter(query: string) {
    // filter the list of clients depending on the query

  }

  initializeTable(clients) {
    this.tableResource = new DataTableResource(clients);
    // display records in  current page i.e page 1
    this.tableResource.query({ offset: 0 }).then(items => (this.items = items));
    // return total number of products that we have
    this.tableResource.count().then(count => (this.itemCount = count));
  }


  reloadItems(params) {
    // if a table param changes run this
    // param can be a table page,sort,resize
    // since reload is called when we launch and the resource is not yer initialized,we plug it if we dont have a resource instance
    if (!this.tableResource) return;

    // call query method again to fetch new items(products)
    this.tableResource.query(params).then(items => (this.items = items));
  }





}
