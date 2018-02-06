import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SelfService } from '../services/self.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private selfS: SelfService,
    private router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.selfS.isLoggedIn) {
      this.router.navigate(['my', 'dictionary']);
      return false;
    }

    return true;
    
  }
}
