import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <h2>{{ question }}</h2>
    <div>
      <button mat-raised-button color="primary" (click)="onConfirm(true)">Yes</button>
      <button mat-raised-button (click)="onConfirm(false)">No</button>
    </div>
  `
})
export class ConfirmDialogComponent {
  public question: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: { question: string },
  ) {
    this.question = this.dialogData.question;
  }

  onConfirm(answer: boolean) {
    this.dialogRef.close(answer);
  }
}
