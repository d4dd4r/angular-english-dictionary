import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SelfService } from '../services/self.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(
    private selfS: SelfService,
    private router: Router,
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (!this.selfS.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.selfS.isLoggedIn;
  }
}
