import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AddClientComponent } from './components/admin/add-client/add-client.component';
import { EditClientComponent } from './components/admin/edit-client/edit-client.component';
import { ClientsDetailsComponent } from './components/admin/clients-details/clients-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { ProductsComponent } from './components/vendor/products/products.component';
import { OrdersComponent } from './components/vendor/orders/orders.component';
import { ProfileComponent } from './components/vendor/profile/profile.component';
import { AdminAuthGuard } from './guards/adminauth.guard';
import { ProductFormComponent } from './components/vendor/product-form/product-form.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard,]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'client/add', component: AddClientComponent , canActivate: [AuthGuard]},
  { path: 'client/edit/:id', component: EditClientComponent, canActivate: [AuthGuard, ]},
  { path: 'client/:id', component: ClientsDetailsComponent , canActivate: [AuthGuard,AdminAuthGuard]},
  { path: 'vendor/products', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: 'vendor/products/new', component: ProductFormComponent, canActivate: [AuthGuard]},
  { path: 'vendor/products/edit/:id', component: ProductFormComponent, canActivate: [AuthGuard]},
  { path: 'vendor/orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'vendor/profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminAuthGuard]
})
export class AppRoutingModule { }
