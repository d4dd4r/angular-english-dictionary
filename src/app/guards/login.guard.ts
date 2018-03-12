import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private authS: AuthService,
    private router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authS.isLoggedIn) {
      this.router.navigate(['my', 'dictionary']);
      return false;
    }

    return true;
  }
}
