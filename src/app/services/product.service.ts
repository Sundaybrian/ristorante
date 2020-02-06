import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$: Observable<any[]>;
  product$: Observable<any>;

  constructor(
    private db: AngularFireDatabase
  ) { }

  create( product, userID) {
    // add a product to firebase
    this.db.list('/products/' + userID).push(product);
  }

  getAll(userID) {
     // return all products of a logged in vendor
    this.products$ = this.db.list('products/' + userID).snapshotChanges().pipe(
      map( changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    return this.products$;

  }

  getProduct(userID, productID) {
    // fetch a single product
    this.product$ = this.db.list(`${userID / productID}`).snapshotChanges().pipe(
      map( changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    return this.product$;

  }


}
