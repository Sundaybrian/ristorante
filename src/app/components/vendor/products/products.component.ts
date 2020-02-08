import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product";
import { DataTableResource } from "angular7-data-table";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit, OnDestroy {
  id: string;
  products: Product[] = [];
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
        this.products = products;

        // initilaizing datatable resource with the products
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
    let filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
    // fix for filtering for the data table
    this.initializeTable(filteredProducts);
  }

  private initializeTable(products) {
    // initialize table resource
    this.tableResource = new DataTableResource(products);
    // display records in  current page i.e page 1
    this.tableResource.query({ offset: 0 }).then(items => (this.items = items));
    // return total number of products that we have
    this.tableResource.count().then(count => (this.itemCount = count));
  }

  reloadItems(params) {
    // if a table param changes run this
    // param can be a table page,sort,resize
    // since reload is called when we launch and the resource is not yer initialized,we plug it if we dont have a resource instance
    if (!this.tableResource) return;

    // call query method again to fetch new items(products)
    this.tableResource.query(params).then(items => (this.items = items));
  }
}
