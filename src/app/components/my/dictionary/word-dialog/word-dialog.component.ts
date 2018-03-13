import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { Word, WORD_TYPES } from '../../../../models/word.class';
import { WordDialog } from '../../../../models/word-dialog.interface';

@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
      <h1 mat-dialog-title>{{ dialogData.title }}</h1>
      <mat-dialog-content>
        <mat-form-field class="full-width">
          <input matInput formControlName="english" placeholder="English word" required>
          <mat-error *ngIf="form.get('english').hasError('required')">You must enter a value</mat-error>
        </mat-form-field>
        <div formArrayName="translates">
          <mat-form-field class="full-width" *ngFor="let translate of translates; let i = index">
            <input matInput [formControlName]="i" placeholder="Translate" required>
            <button mat-button matSuffix mat-icon-button
                *ngIf="i !== 0"
                (click)="onDelete($event, i)">
              <mat-icon>close</mat-icon>
            </button>
            <mat-error *ngIf="translate.hasError('required')">You must enter a value</mat-error>
          </mat-form-field>
        </div>
        <div class="actions-wrapper">
          <mat-checkbox formControlName="known">Already known</mat-checkbox>
          <button mat-raised-button mat-mini-fab color="primary" type="button"
              (click)="onAddTranslate()">
            <mat-icon>playlist_add</mat-icon>
          </button>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-raised-button color="primary"
            [disabled]="form.invalid">Save</button>
        <button mat-raised-button type="button" mat-dialog-close>Cancel</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .actions-wrapper { display: flex; justify-content: space-between }
    .add-btn-wrapper { display: flex; justify-content: flex-end }
  `]
})
export class WordDialogComponent implements OnInit {
  public form: FormGroup;
  public translates: FormControl[];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<WordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { word: Word, title: string },
  ) {}

  ngOnInit() {
    const english = this.dialogData.word ? this.dialogData.word.english : '';
    const known = this.dialogData.word ? this.dialogData.word.type === WORD_TYPES.KNOWN : false;

    this.translates = this.fillFormArray();
    this.form = this.formBuilder.group({
      english: [english, [Validators.required]],
      translates: this.formBuilder.array(
        this.translates
      ),
      known: [known, []]
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

  onDelete(event: MouseEvent, index: number) {
    event.preventDefault();
    (<FormArray>this.form.get('translates')).removeAt(index);
  }

  private fillFormArray(): FormControl[] {
    if (!this.dialogData.word) return [this.formBuilder.control('', [Validators.required])];

    return this.dialogData.word.russian.map(translate => this.formBuilder.control(translate, [Validators.required]));
  }

}
