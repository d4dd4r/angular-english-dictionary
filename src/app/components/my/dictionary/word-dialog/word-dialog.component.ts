import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { WordDialog } from '../../../../models/word-dialog.interface';

@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
      <h1 mat-dialog-title>Add new word</h1>
      <mat-dialog-content>
        <mat-form-field class="full-width">
          <input matInput formControlName="english" placeholder="English word" required>
          <mat-error *ngIf="form.get('english').hasError('required')">You must enter a value</mat-error>
        </mat-form-field>
        <mat-form-field class="full-width">
          <input matInput formControlName="translate" placeholder="Translate" required>
          <mat-error *ngIf="form.get('translate').hasError('required')">You must enter a value</mat-error>
        </mat-form-field>
        <mat-form-field class="full-width">
          <input matInput formControlName="additionalTranslate" placeholder="Additional translate">
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-raised-button color="primary"
            [disabled]="form.invalid">Add</button>
        <button mat-raised-button type="button" mat-dialog-close>Cancel</button>
      </mat-dialog-actions>
    </form>
  `
})
export class WordDialogComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<WordDialogComponent>,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      english: ['', [Validators.required]],
      translate: ['', [Validators.required]],
      additionalTranslate: [''],
    });
  }

  onSubmit(values: WordDialog) {
    this.dialogRef.close(values);
  }

}