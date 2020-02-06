import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  create( product, userID) {
    // add a product to firebase
    this.db.list('/products/' + userID).push(product);
  }
}
