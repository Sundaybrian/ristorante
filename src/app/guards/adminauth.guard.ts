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
  constructor(private auth: AuthService, private clientService: ClientService, public router: Router) {

  }
  // admin auth guard to protect routes if not admin
  canActivate(route, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      map( auth => {
        if (auth) {
          //
          let bool: boolean;
          const clientRef = firebase.database().ref('/users/clients/').child(auth.uid);
          clientRef.on('value', function(snap) {
            const client = snap.val();

            if ( client.isAdmin == true) {
              // this is admin
              console.log(client);
              bool = true;

            }

            // not admin in redirect to vendor page
            this.router.navigate(['/vendors/profile/' + auth.uid]);
            bool = false;

          });

          return bool;


        }

      })
    );
  }
}
