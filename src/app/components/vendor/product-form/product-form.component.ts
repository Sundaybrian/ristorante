import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {
    title: '',
    price: 0,
    category: '',
    imageUrl: ''
  };

  id: string;

  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductService,
    private authService: AuthService,
    private flash: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // fetch the categories for the meals
    this.categories$ = this.categoriesService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      // get id of the product from url and fetch that product from firebase
      this.productService
        .getProduct(this.authService.getUserID(), this.id)
        .subscribe(p => {
          this.product = p;
          console.log(this.product);
          });
    }
  }

  ngOnInit() {}

  onSubmit(product) {
    // get currentUser id
    const userID = this.authService.getUserID();
    if ( this.id) {
      // if we have an id,means we are updating a product
      this.productService.updateProduct(userID, this.id, product);
      this.flash.show('Product updated succesfully', {
        cssClass: 'alert-success',
        timeout: 5000
      });
    } else {

      // else create a product in firebase
      this.productService.create(product, userID);
      // show flash message
      // show flash message
      this.flash.show('Product created succesfully', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // redirect to vendor dashboard
    }
     // navigate to products page
    this.router.navigate(['/vendor/products/']);
  }
}
