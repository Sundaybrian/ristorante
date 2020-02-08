import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular7-data-table';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ClientsComponent } from './components/admin/clients/clients.component';
import { ClientsDetailsComponent } from './components/admin/clients-details/clients-details.component';
import { EditClientComponent } from './components/admin/edit-client/edit-client.component';
import { AddClientComponent } from './components/admin/add-client/add-client.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { ClientService } from './services/client.service';
import { SettingsComponent } from './components/settings/settings.component';
import { ProductsComponent } from './components/vendor/products/products.component';
import { OrdersComponent } from './components/vendor/orders/orders.component';
import { ProfileComponent } from './components/vendor/profile/profile.component';
import { ProductFormComponent } from './components/vendor/product-form/product-form.component';
import { CategoriesService } from './services/categories.service';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClientsComponent,
    ClientsDetailsComponent,
    EditClientComponent,
    AddClientComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    SettingsComponent,
    ProductsComponent,
    OrdersComponent,
    ProfileComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTableModule.forRoot(),
    CustomFormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AuthService, ClientService, CategoriesService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
