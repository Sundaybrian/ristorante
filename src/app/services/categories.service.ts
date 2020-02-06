import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
  ) { }

  getCategories() {
    this.categories = this.db.list('categories').snapshotChanges().pipe(
      map( changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    return this.categories;

  }


}
