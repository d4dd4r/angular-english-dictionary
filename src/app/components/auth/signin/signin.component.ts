import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { SelfService } from '../../../services/self.service';
import { UserService } from '../../../services/user.service';

import { Login } from '../../../models/login.interface';

@Component({
  template: `
    <mat-sidenav-container>
      <mat-sidenav-content class="container">
        <div class="form-container">
          <div class="form-container-title">
            <h2 class="no-margin">Login</h2>
          </div>
          <div class="form-container-body">
            <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
              <mat-form-field class="full-width">
                <input matInput placeholder="test@mail.com" formControlName="email">
                <mat-error *ngIf="form.controls.email.invalid">{{ getErrorMessage('email') }}</mat-error>
              </mat-form-field>
              <mat-form-field class="full-width">
                <input matInput type="password" placeholder="12345" formControlName="password">
                <mat-error *ngIf="form.controls.password.invalid">{{ getErrorMessage('password') }}</mat-error>
              </mat-form-field>
              <div class="full-width actions">
                <button type="button" mat-button routerLink="../signup">Sign Up</button>
                <button mat-raised-button color="primary"
                    [disabled]="!form.valid">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userS: UserService,
    private selfS: SelfService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(login: Login) {
    if (this.userS.checkCredentials(login)) {
      this.selfS.isLoggedIn = true;
      this.selfS.self = this.userS.users.find(user => (
        (user.email.toLowerCase() === login.email.toLowerCase()) && (user.password.toLowerCase() === login.password.toLowerCase())
      ));
      this.router.navigate(['my']);
    } else {
      this.openSnackBar('Email or Password is wrong!', 'Login');
    }
  }

  getErrorMessage(type: string): string | void {
    if (type === 'email') {
      if (this.form.get('email').hasError('required')) return 'You must enter a value';
      if (this.form.get('email').hasError('email')) return 'Not a valid email';
    } else if (type === 'password') {
      if (this.form.get('password').hasError('required')) return 'You must enter a value';
      if (this.form.get('password').hasError('minlength')) return 'Minimum 5 characters';
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: 'warning'
    });
  }
}
