import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Login } from '../../models/login.interface';

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
                <input matInput placeholder="test@mail.com" formControlName="email" required>
                <mat-error *ngIf="form.controls.email.invalid">{{ getErrorMessage('email') }}</mat-error>
              </mat-form-field>
              <mat-form-field class="full-width">
                <input matInput placeholder="12345" formControlName="password" required>
                <mat-error *ngIf="form.controls.password.invalid">{{ getErrorMessage('password') }}</mat-error>
              </mat-form-field>
              <div class="full-width text-right">
                <button mat-raised-button color="primary"
                    [disabled]="!form.valid">Login</button>
              </div>
            </form>
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(login: Login) {
    this.router.navigate(['my']);
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
}
