import { Component, OnInit } from '@angular/core';

import { NavbarLinks } from '../../models/navbar-links.class';

@Component({
  template: `
    <app-navbar [links]="links"></app-navbar>
    <div class="body">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .body {
      min-height: calc(100vh - 86px);
      margin: 68px 21px 18px 21px;
      border-radius: 3px;
      background-color: rgba(255, 255, 255, .9);
    }
  `]
})
export class MyComponent implements OnInit {
  public links: NavbarLinks[];

  ngOnInit() {
    this.links = [
      new NavbarLinks('dictionary', 'Dictionary'),
      new NavbarLinks('exercises', 'Exercises'),
    ];
  }

}
