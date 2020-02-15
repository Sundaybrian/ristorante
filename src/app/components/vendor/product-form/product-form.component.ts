import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';



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
    imageUrl: '',
    downloadURL: '',
  };

  id: string;
  userID;

  // main task
  task: AngularFireUploadTask;

  // progress monitoring
  percentage: Observable<number>;

  snapshot: Subscription;

  // downloadUrl
  downloadURL: Observable<string>;

  // actual url string from image card
  @ViewChild('imageCard') url: ElementRef;



  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductService,
    private authService: AuthService,
    private flash: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private afStorage: AngularFireStorage

  ) {
    // get userID
    this.userID = this.authService.getUserID();
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

  startUpload(event: FileList) {
    // file object
    const file = event.item(0);

    // client side validation
    if (file.type.split('/')[0] !== 'image') {
      this.flash.show('Please upload a valid image', {
        cssClass: 'alert-danger', timeout: 4000
      });
      return;
    }

    // the storage path
    const path = `${this.userID}/${new Date().getTime()}_${file.name}`;
    const fileRef = this.afStorage.ref(path);

    // the main task
    this.task = this.afStorage.upload(path, file);

    // progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        // file download url
        this.downloadURL = fileRef.getDownloadURL();
        // s
       } )
   )
  .subscribe();

  }

   // Determines if the upload task is active
   isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  onSubmit(product) {
    // get currentUser id
    if (this.id) {
      // if we have an id,means we are updating a product
      this.productService.updateProduct(this.userID, this.id, product);
      this.flash.show('Product updated succesfully', {
        cssClass: 'alert-success',
        timeout: 5000
      });
    } else {
      // else create a product in firebase
      // adding the url from firebase and binding to the product obj
      product.downloadURL = this.url.nativeElement.src;
      this.productService.create(product, this.userID);
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

  deleteProduct() {
    if (
      confirm(
        `Are you sure you want to delete ${this.product.title} product? this cannot be undone`
      )
    ) {
      // remove product
      this.productService.deleteProduct(this.userID, this.id, this.product);
      // show flash message
      this.flash.show('Product removed', {
        cssClass: 'alert-success',
        timeout: 4000
      });

      // navigate to dashboard
      this.router.navigate(['/vendor/products']);
    }
  }
}
