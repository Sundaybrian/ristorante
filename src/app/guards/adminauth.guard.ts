import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { ClientService } from '../services/client.service';
import { Client } from '../models/Clients';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private clientService: ClientService) {

  }
  // auth guard to protect routes if not logged in
  canActivate(route, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      map( user => {
          if (user) {
            const client = this.clientService.getClient(user.uid);
            // returns boolen true or false
            // if true it is admin
            console.log(client);
            return client.isAdmin;
          }
      })
    );
  }
}
