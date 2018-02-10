import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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
        <div formArrayName="translates">
          <mat-form-field class="full-width" *ngFor="let translate of form.get('translates').controls; let i = index">
            <input matInput [formControlName]="i" placeholder="Translate" required>
          </mat-form-field>
        </div>
        <div class="add-btn-wrapper">
          <button mat-raised-button mat-mini-fab color="primary" type="button"
              (click)="onAddTranslate()">
            <mat-icon>playlist_add</mat-icon>
          </button>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-raised-button color="primary"
            [disabled]="form.invalid">Add</button>
        <button mat-raised-button type="button" mat-dialog-close>Cancel</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .add-btn-wrapper { display: flex; justify-content: flex-end }
  `]
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
      translates: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required])
      ])
    });
  }

  onAddTranslate() {
    (<FormArray>this.form.get('translates')).push(
      this.formBuilder.control('', [Validators.required])
    );
  }

  onSubmit(values: WordDialog) {
    this.dialogRef.close(values);
  }

}
