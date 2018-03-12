import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../services/auth.service';

import { AuthData } from '../../../models/auth-data.interface';
import { User } from 'firebase';

@Component({
  template: `
    <mat-sidenav-container>
      <mat-sidenav-content class="container">
        <div class="form-container">
          <div class="form-container-title">
            <h2 class="no-margin">Sign In</h2>
          </div>
          <div class="form-container-body">
            <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
              <mat-form-field class="full-width">
                <input matInput placeholder="your@email.com" formControlName="email">
                <mat-error *ngIf="form.controls.email.invalid">{{ getErrorMessage('email') }}</mat-error>
              </mat-form-field>
              <mat-form-field class="full-width">
                <input matInput type="password" placeholder="password" formControlName="password">
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
export class SigninComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private subscription: Subscription;
  private user: User;
  private passwordMinLength = 6;
  private confirmationAction = 'Send email confirmation';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authS: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(this.passwordMinLength)]],
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSubmit(authData: AuthData) {
    this.authS.signInUser(authData)
      .then(user => {
        if (user.emailVerified) {
          this.authS.isLoggedIn = true;
          this.router.navigate(['my']);
        } else {
          this.user = user;
          this.openSnackBar('You should approve your email', this.confirmationAction, 'warning');
          this.authS.signOut();
        }
      })
      .catch(err => this.openSnackBar('Email or Password is wrong!'))
    ;
  }

  getErrorMessage(type: string): string | void {
    if (type === 'email') {
      if (this.form.get('email').hasError('required')) return 'You must enter a value';
      if (this.form.get('email').hasError('email')) return 'Not a valid email';
    } else if (type === 'password') {
      if (this.form.get('password').hasError('required')) return 'You must enter a value';
      if (this.form.get('password').hasError('minlength')) return `Minimum ${this.passwordMinLength} characters`;
    }
  }

  private openSnackBar(message: string, action: string = '', panelClass: string | string[] = '') {
    const snackBar = this.snackBar.open(message, action, {
      duration: 4000,
      panelClass,
    });

    if (action === this.confirmationAction) {
      this.subscription = snackBar.onAction()
        .subscribe(() => {
          this.authS.sendEmailConfirmation(this.user)
            .then(() => this.openSnackBar('Email has been sent', '', ['info', 'font-white']))
          ;
        })
      ;
    }
  }
}
