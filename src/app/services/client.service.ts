import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Client } from '../models/Clients';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsRef: AngularFireList<any>;
  clients: Observable<any[]>;
  client: any;
  clientRef: any;
  vendorsRef: any;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
    ) {
      // reference to the clients tree
      this.clientsRef = this.db.list('users/clients/');

    }


    getClients() {
      // Get clients with the id
      this.clients = this.clientsRef.snapshotChanges().pipe(
        map( changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );

      return this.clients;

    }

    newClient(client: Client) {
      // adding a client to the clients tree
      this.clientsRef.push(client);
    }

    getClient(id: string) {
      // Get a single client with id
      this.clientRef = this.db.object('users/clients/' + id);

      this.clientRef.snapshotChanges().
     subscribe(
       action => {

         if (action.payload.exists === false) {
           return null;

         } else {
           const data = action.payload.val() as Client;
           data.key = action.payload.key;
          // setting the client data
           this.client = data;
         }
       }
     );

      return this.client;


    }

    newClient2(uid: string, client: Client) {
      // will be used to replace the old client later on
      console.log(client);
      delete client.password;
      this.db.object('users/clients/' + uid).set(client);
      // this.clientRef.ref(uid).set(client);

    }

    updateClient(client: Client) {
      this.clientRef = this.db.object('/users/clients/' + client.key);
      this.clientRef.update(client);
    }

    deleteClient(client: Client) {
      this.clientRef = this.db.object('/users/clients/' + client.key);
      this.clientRef.remove();
    }



}
