import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private flash: FlashMessagesService,
    private router: Router

  ) {
    this.categories$ = this.categoriesService.getCategories();

   }

  ngOnInit() {
  }

  onSubmit(product) {
    // get currentUser id
    const userID = this.authService.userObj.key;
    // create a product in firebase
    this.productService.create(product, userID);
    // show flash message
    // show flash message
    this.flash.show('Product created succesfully', {
      cssClass: 'alert-success', timeout: 4000
    });
    // redirect to vendor dashboard
    this.router.navigate(['/vendor/products/' + userID]);


  }

}
