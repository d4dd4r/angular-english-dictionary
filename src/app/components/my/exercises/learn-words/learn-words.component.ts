import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import _ from 'lodash';

import { Exercise } from '../exercise.parent';
import { WordService } from '../../../../services/word.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog.component';
import { ComponentDeactivateGuard } from '../../../../guards/component-deactivate.guard';
import { TranslateWord } from '../../../../models/translate-word.class';
import { Word } from '../../../../models/word.class';

@Component({
  template: `
    <div class="body">
      <div class="text-center wrap">
        <mat-grid-list cols="3" rows="2" rowHeight="3:1" *ngIf="!gameOver; else gameOverBlock">
          <mat-grid-tile colspan="3">
            <h2>{{ currentWord.english }}</h2>
          </mat-grid-tile>
          <mat-grid-tile *ngFor="let translate of currentTranslates; let i = index">
            <button mat-button (click)="checkAnswer(translate.id)">
              {{ translate.translate }}
            </button>
          </mat-grid-tile>
          <mat-grid-tile colspan="3" rowspan="2">
            <h3 class="half">Success matches: {{ successMatches }}</h3>
            <h3 class="half">Words: {{ currentWordCount }}/{{ totalWordsCount }}</h3>
          </mat-grid-tile>
        </mat-grid-list>
        <ng-template #gameOverBlock>
          <h2>{{ getResultText() }}</h2>
          <h3>Success matches: {{ successMatches }}</h3>
          <button mat-raised-button color="primary" (click)="onRestartGame()">Try again</button>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .body { display: flex; height: calc(100vh - 86px); justify-content: center; align-items: center }
    .wrap { width: 50vw }
  `]
})
export class LearnWordsComponent extends Exercise implements OnInit, ComponentDeactivateGuard {
  public currentTranslates: TranslateWord[] = [];
  private translateLimitCount = 6;

  constructor(
    private route: ActivatedRoute,
    snackBar: MatSnackBar,
    wordS: WordService,
    dialog: MatDialog,
  ) {
    super(snackBar, wordS, dialog);
  }

  ngOnInit() {
    this.runExercise();
  }

  checkAnswer(id: number) {
    if (id === this.currentWord.id) ++this.successMatches && this.openSnackBar('Success');
    else this.openSnackBar('Fail');

    this.checkStatus();
  }

  onRestartGame() {
    this.currentTranslates = [];
    this.restartGame();
    this.runExercise();
  }

  private runExercise() {
    this.currentWord = this.shuffledWords.shift();
    this.currentTranslates = this.getRandomWords(this.currentWord);
  }

  private checkStatus() {
    if (this.totalWordsCount === this.currentWordCount) {
      this.gameOver = true;
      return;
    }

    ++this.currentWordCount;
    this.runExercise();
  }

  private getRandomWords(currentWord: Word): TranslateWord[] {
    let shuffledCards = _.chain(this.allWords)
      .shuffle()
      .pullAllBy([currentWord], 'id')
      .take(this.translateLimitCount - 1)
      .value()
    ;
    shuffledCards.push(currentWord);

    return _.chain(shuffledCards)
      .shuffle()
      .map((word: Word) => new TranslateWord(word.id, _.sample(word.russian)))
      .value()
    ;
  }

}
