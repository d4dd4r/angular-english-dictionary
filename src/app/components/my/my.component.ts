import { Component, OnInit } from '@angular/core';
import { NavbarLinks } from '../../models/navbar-links.class';

@Component({
  template: `
    <app-navbar [links]="links"></app-navbar>
  `
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
