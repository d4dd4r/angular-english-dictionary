import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import 'rxjs/add/operator/first';

import { Word } from '../../../models/word.class';
import { WordDialog } from '../../../models/word-dialog.interface';
import { WordService } from '../../../services/word.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component'
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
        <span class="actions">
          <button mat-raised-button mat-mini-fab color="primary"
              (click)="onEdit(word)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-raised-button mat-mini-fab color="primary"
              (click)="onDelete(word)">
            <mat-icon>delete</mat-icon>
          </button>
        </span>
      </mat-list-item>
    </mat-nav-list>
    <button mat-raised-button mat-mini-fab color="primary" class="fixed-button"
        (click)="openWordDialog()">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent {
  public words: Word[];
  private editMode = false;
  private editWordId: number;
  private wordDialogRef: MatDialogRef<WordDialogComponent>;
  private confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private wordS: WordService,
  ) {
    this.words = this.wordS.words;
  }

  openWordDialog(word?: Word) {
    this.wordDialogRef = this.dialog.open(WordDialogComponent, {
      width: '25vw',
      data: { word }
    });

    this.wordDialogRef.afterClosed()
      .first()
      .subscribe((result: WordDialog) => {
        if (!result) return;

        if (this.editMode) {
          this.wordS.updateWord(result, this.editWordId);
          this.disableEditMoide();
        } else {
          this.wordS.word = new Word(result.english, result.translates);
        }

        this.words = this.wordS.words;
      })
    ;
  }

  onEdit(word: Word) {
    this.editMode = true;
    this.editWordId = word.id;
    this.openWordDialog(word);
  }

  onDelete(word: Word) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30vw',
      data: { question: `You want to remove ${word.english} word. Are you sure?` }
    });

    this.confirmDialogRef.afterClosed()
      .first()
      .subscribe((isConfirm: boolean) => {
        if (isConfirm) {
          this.wordS.removeWord(word.id);
          this.words = this.wordS.words;
        }
      })
    ;
  }

  private disableEditMoide() {
    this.editMode = false;
    this.editWordId = null;
  }
}
