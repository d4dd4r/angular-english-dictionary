import { RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: (nextState: RouterStateSnapshot) => boolean;
}
