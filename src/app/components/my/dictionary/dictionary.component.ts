import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';

import { Word, WORD_TYPES } from '../../../models/word.class';
import { WordDialog } from '../../../models/word-dialog.interface';
import { WordService } from '../../../services/word.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
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
        (click)="openWordDialog('Add new word')">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnDestroy {
  public words: Word[];
  private editMode = false;
  private editWordId: number;
  private wordDialogRef: MatDialogRef<WordDialogComponent>;
  private confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  private subscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private wordS: WordService,
    private snackBar: MatSnackBar,
  ) {
    this.words = this.wordS.words;
    this.subscription = this.wordS.onWordUpdate
      .subscribe(words => this.words = words)
    ;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openWordDialog(title: string, word?: Word) {
    this.wordDialogRef = this.dialog.open(WordDialogComponent, {
      width: '25vw',
      data: { word, title }
    });

    this.wordDialogRef.afterClosed()
      .first()
      .subscribe((result: WordDialog) => {
        if (!result) return;

        const wordType = result.known ? WORD_TYPES.KNOWN : WORD_TYPES.NEW;

        if (this.editMode) {
          this.wordS.updateWord(result, this.editWordId);
          this.disableEditMoide();
          this.openSnackBar('Word is successfully changed');
        } else {
          this.wordS.word = new Word(result.english, result.translates, wordType);
          this.openSnackBar('Word is successfully added');
        }
      })
    ;
  }

  onEdit(word: Word) {
    this.editMode = true;
    this.editWordId = word.id;
    this.openWordDialog('Edit the word', word);
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
          this.openSnackBar('Word is successfully removed');
        }
      })
    ;
  }

  private disableEditMoide() {
    this.editMode = false;
    this.editWordId = null;
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      panelClass: 'primary'
    });
  }
}
