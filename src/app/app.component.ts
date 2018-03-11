import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment.prod';
import * as firebase from 'firebase';

@Component({
  selector: 'my-app',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: environment.firebase.apiKey,
      authDomain: environment.firebase.authDomain,
    });
  }
}
