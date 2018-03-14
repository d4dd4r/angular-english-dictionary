import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';

import { Word, WORD_TYPES } from '../../../models/word.class';
import { WordDialog } from '../../../models/word-dialog.interface';
import { FbWordService } from '../../../services/fb-word.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import { WordDialogComponent } from './word-dialog/word-dialog.component';

@Component({
  template: `
    <div>
      <mat-nav-list>
        <mat-list-item class="header">
          <div matLine class="row">
            <span class="index">#</span>
            <span class="english">Word</span>
            <span class="translate">Translate</span>
            <span class="actions">
              <mat-checkbox align="end" (click)="isShowAllWords = !isShowAllWords">Show known words too</mat-checkbox>
              <button mat-raised-button matSuffix color="primary"
                  (click)="openWordDialog('Add new word')">Add new</button>
            </span>
          </div>
        </mat-list-item>
      </mat-nav-list>
    </div>
    <div class="wrapper">
      <mat-nav-list>
        <ng-container *ngFor="let word of words | async; let i = index">
          <mat-list-item
            *ngIf="word.type === wordTypes.NEW || (isShowAllWords && word.type === wordTypes.KNOWN)"
            [ngClass]="{ known: word.type === wordTypes.KNOWN }">
          <div class="row">
            <span class="index">{{ i + 1 }}</span>
            <span class="english">{{ word.english }}</span>
            <span class="translate">{{ word.russian.join(', ') }}</span>
            <span class="actions">
              <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item (click)="onEdit(word)">
                  <mat-icon>edit</mat-icon>
                  <span>Edit</span>
                </button>
                <button mat-menu-item (click)="onDelete(word)">
                  <mat-icon>delete</mat-icon>
                  <span>Remove</span>
                </button>
              </mat-menu>
            </span>
          </div>
        </mat-list-item>
        </ng-container>
      </mat-nav-list>
    </div>
  `,
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit, OnDestroy {
  public words: Observable<Word[]>;
  public isShowAllWords = false;
  public wordTypes = WORD_TYPES;
  private editMode = false;
  private editWordId: string;
  private wordDialogRef: MatDialogRef<WordDialogComponent>;
  private confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  private subscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private fbWordS: FbWordService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.words = this.fbWordS.words;
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
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
        const newWord = new Word(result.english, result.translates, wordType);

        if (this.editMode) {
          this.fbWordS.updateWord(newWord, this.editWordId);
          this.disableEditMode();
          this.openSnackBar('Word is successfully changed');
        } else {
          this.fbWordS.word = newWord;
          this.openSnackBar('Word is successfully added');
        }
      })
    ;
  }

  onEdit(word: Word) {
    this.editMode = true;
    this.editWordId = word.english.toLowerCase();
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
          this.fbWordS.removeWord(word);
          this.openSnackBar('Word is successfully removed');
        }
      })
    ;
  }

  private disableEditMode() {
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
