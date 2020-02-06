import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private categoriesService: CategoriesService

  ) {
    this.categories$ = this.categoriesService.getCategories();

   }

  ngOnInit() {
  }

  onSubmit(value) {
    console.log(value);
  }

}
