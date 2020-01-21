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
  client: Observable<Client>;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
    ) {
      this.clientsRef = this.db.list('users/clients/');


    }


    getClients() {
      // Get clients with the id
      this.clients = this.clientsRef.snapshotChanges().pipe(
        map( changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );

    }


}
