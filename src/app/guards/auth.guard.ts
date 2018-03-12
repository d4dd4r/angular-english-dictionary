import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(
    private authS: AuthService,
    private router: Router,
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (!this.authS.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
