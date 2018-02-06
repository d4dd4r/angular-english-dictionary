import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarLinks } from '../../../models/navbar-links.class';
import { SelfService } from '../../../services/self.service';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar">
      <nav class="navbar-header">
        <button mat-button
            routerLinkActive="active"
            *ngFor="let link of links"
            routerLink="{{ link.link }}">{{ link.name }}</button>
        <div class="flex-spacer"></div>
        <button mat-button (click)="logout()">Logout</button>
      </nav>
    </div>
  `,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input('links') public links: NavbarLinks[];

  constructor(
    private router: Router,
    private selfS: SelfService,
  ) {}

  logout() {
    this.selfS.reset();
    this.router.navigate(['..', 'login']);
  }
}
