import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit ,OnDestroy{
  id: string;
  products: any[] = [];
  filteredProducts: any[];
  productsSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {

    this.id = this.authService.getUserID();
    this.productsSubscription = this.productService.getAll(this.id).subscribe(
       products => this.filteredProducts = this.products = products
     );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // manual unsubscribing from the products observable
    this.productsSubscription.unsubscribe();
  }

  filter(query: string) {
    // if we have a query
    // we filter the products array and update it with obj that match the query
    // else we just return the initial products array
    this.filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;

  }

}
