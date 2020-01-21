import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AddClientComponent } from './components/admin/add-client/add-client.component';
import { EditClientComponent } from './components/admin/edit-client/edit-client.component';
import { ClientsDetailsComponent } from './components/admin/clients-details/clients-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'client/add', component: AddClientComponent},
  { path: 'client/edit/:id', component: EditClientComponent},
  { path: 'client/:id', component: ClientsDetailsComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
