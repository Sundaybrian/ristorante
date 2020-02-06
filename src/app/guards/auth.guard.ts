import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {

  }
  // auth guard to protect routes if not logged in
  canActivate(route, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      map( auth => {
        if (!auth) {
          // not logged in redirect to login page
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
          return false;

        } else {
          return true;
        }
      })
    );
  }

}
