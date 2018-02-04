import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import 'rxjs/add/operator/first';

import { Word } from '../../../models/word.class';
import { WordDialog } from '../../../models/word-dialog.interface';
import { WordService } from '../../../services/word.service';
import { WordDialogComponent } from './word-dialog/word-dialog.component';

@Component({
  template: `
    <mat-nav-list>
      <mat-list-item class="header">
        <div matLine class="row">
          <span class="index">#</span>
          <span class="english">Word</span>
          <span class="translate">Translate</span>
        </div>
      </mat-list-item>
      <mat-list-item *ngFor="let word of words; let i = index">
        <span class="index">{{ i + 1 }}</span>
        <span class="english">{{ word.english }}</span>
        <span class="translate">{{ word.russian.join(', ') }}</span>
      </mat-list-item>
    </mat-nav-list>
    <button mat-raised-button class="fixed-button" color="primary"
        (click)="openWordDialog()">
      Add new word <mat-icon>games</mat-icon>
    </button>
  `,
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent {
  public dialogRef: MatDialogRef<WordDialogComponent>;
  public words: Word[];

  constructor(
    private dialog: MatDialog,
    private wordS: WordService,
  ) {
    this.words = this.wordS.words;
  }

  openWordDialog() {
    this.dialogRef = this.dialog.open(WordDialogComponent, {
      width: '25vw'
    });

    this.dialogRef.afterClosed()
      .first()
      .subscribe((result: WordDialog) => {
        const translate = result.additionalTranslate ? [result.translate, result.additionalTranslate] : [result.translate];
        this.wordS.word = new Word(result.english, translate);
        this.words = this.wordS.words;
      })
    ;
  }
}
