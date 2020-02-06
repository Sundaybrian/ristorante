import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductService,
    private authService: AuthService

  ) {
    this.categories$ = this.categoriesService.getCategories();

   }

  ngOnInit() {
  }

  onSubmit(product) {
    const userID = this.authService.userObj.key;
    this.productService.create(product, userID);

  }

}
