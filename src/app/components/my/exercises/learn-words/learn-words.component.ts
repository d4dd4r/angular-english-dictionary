import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import _ from 'lodash';

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
          <button mat-raised-button color="primary" (click)="restartGame()">Try again</button>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .body { display: flex; height: calc(100vh - 86px); justify-content: center; align-items: center }
    .wrap { width: 50vw }
  `]
})
export class LearnWordsComponent implements OnInit, ComponentDeactivateGuard {
  private confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  private allWords: Word[];
  private shuffledWords: Word[];
  public currentTranslates: TranslateWord[];
  public currentWord: Word;
  public totalWordsCount = 20;
  public translateLimitCount = 6;
  public currentWordCount = 1;
  public successMatches = 0;
  public gameOver = false;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.allWords = this.route.snapshot.data['words'];
    this.shuffledWords = this.getShuffledWords();
    this.runExercise();
  }

  canDeactivate() {
    return (this.currentWordCount === this.totalWordsCount || this.confirm());
  }

  checkAnswer(id: number) {
    if (id === this.currentWord.id) ++this.successMatches && this.openSnackBar('Success');
    else this.openSnackBar('Fail');

    this.checkStatus();
  }

  restartGame() {
    this.shuffledWords = this.getShuffledWords();
    this.currentTranslates = [];
    this.currentWord = null;
    this.currentWordCount = 1;
    this.successMatches = 0;
    this.runExercise();
    this.gameOver = false;
  }

  getResultText(): string {
    if (this.successMatches <= 4) return 'Go to learn words!';
    if (this.successMatches <= 9) return 'Don\'t give up!';
    if (this.successMatches <= 14) return 'Not bad, but you can better!';
    if (this.successMatches <= 19) return 'Good!';
    if (this.successMatches === 20) return 'Well done!';
  }

  private getShuffledWords(): Word[] {
    return _.chain(this.allWords)
      .shuffle()
      .take(this.totalWordsCount)
      .value()
    ;
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

  private openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      panelClass: 'primary'
    });
  }

  private confirm(): Promise<boolean> {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '25vw',
      data: { question: 'Do you want to finish the exercise?' }
    });

    return new Promise(resolve => {
      this.confirmDialogRef.afterClosed()
        .first()
        .subscribe((isConfirm: boolean) => resolve(isConfirm))
      ;
    });
  }

}
