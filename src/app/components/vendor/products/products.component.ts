import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  id: string;
  products$;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {

    this.id = this.authService.getUserID();
    this.products$ = this.productService.getAll(this.id);
  }

  ngOnInit() {
  }

}
