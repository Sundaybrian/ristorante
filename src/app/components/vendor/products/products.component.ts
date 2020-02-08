import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product";
import { DataTableResource } from "angular-4-data-table";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit, OnDestroy {
  id: string;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  tableResource: DataTableResource<Product>;
  productsSubscription: Subscription;
  items: Product[] = [];
  itemCount: number;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.id = this.authService.getUserID();
    this.productsSubscription = this.productService
      .getAll(this.id)
      .subscribe(products => {
        this.filteredProducts = this.products = products;

        // initilaizing data table
        this.initializeTable(products);
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    // manual unsubscribing from the products observable
    this.productsSubscription.unsubscribe();
  }

  filter(query: string) {
    // if we have a query
    // we filter the products array and update it with obj that match the query
    // else we just return the initial products array
    this.filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  private initializeTable(products) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 }).then(items => (this.items = items));
    // return total number of productas in a table
    this.tableResource.count().then(count => (this.itemCount = count));
  }
}
