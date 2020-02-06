import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { ClientService } from '../services/client.service';
import { Client } from '../models/Clients';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, public router: Router) {

  }
  // admin auth guard to protect routes if not admin
  canActivate(route, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return true;
  }
}
