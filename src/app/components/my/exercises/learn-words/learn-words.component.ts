import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Word } from '../../../../models/word.class';

@Component({
  template: `
    <div class="body">
      <div class="text-center wrap">
        <mat-grid-list cols="3" rows="2" rowHeight="3:1" *ngIf="!gameOver; else gameOverBlock">
          <mat-grid-tile colspan="3">
            <h2>{{ currentWord.english }}</h2>
          </mat-grid-tile>
          <mat-grid-tile *ngFor="let translate of currentTranslates">
            <button mat-button (click)="checkAnswer(translate.id)">
              {{ getTranslate(translate.russian) }}
            </button>
          </mat-grid-tile>
          <mat-grid-tile colspan="3" rowspan="2">
            <h3 class="half">Success matches: {{ successMatches }}</h3>
            <h3 class="half">Words: {{ currentWordCount }}/{{ totalWordsCount }}</h3>
          </mat-grid-tile>
        </mat-grid-list>
        <ng-template #gameOverBlock>
          <h2>Game over</h2>
          <h3>Success matches: {{ successMatches }}</h3>
          <button mat-raised-button color="primary" (click)="restartGame()">Try again</button>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .body { display: flex; height: calc(100vh - 86px); justify-content: center; align-items: center }
    .wrap { width: 50vw }
    .half { display: inline-block; width: 50% }
  `]
})
export class LearnWordsComponent implements OnInit {
  private allWords: Word[];
  private shuffledWords: Word[];
  public currentTranslates: Word[];
  public currentWord: Word;
  public totalWordsCount = 20;
  public translateLimitCount = 6;
  public currentWordCount = 1;
  public successMatches = 0;
  public gameOver = false;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.allWords = this.route.snapshot.data['words'];
    this.shuffledWords = this.shuffle(this.allWords, this.totalWordsCount);
    this.runExercise();
  }

  checkAnswer(id: number) {
    if (id === this.currentWord.id) ++this.successMatches && this.openSnackBar('Success');
    else this.openSnackBar('Fail');

    this.checkStatus();
  }

  restartGame() {
    this.shuffledWords = this.shuffle(this.allWords, this.totalWordsCount);
    this.currentTranslates = [];
    this.currentWord = null;
    this.currentWordCount = 1;
    this.successMatches = 0;
    this.runExercise();
    this.gameOver = false;
  }

  getTranslate(translates: string[]) {
    const index = this.getRandomInt(1, translates.length);
    return translates[index];
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

  private getRandomWords(currentWord: Word): Word[] {
    const words = (<Word[]>this.shuffle(this.allWords, this.translateLimitCount))
      .filter(word => word.id !== currentWord.id);
    
    if (words.length === this.translateLimitCount) words.shift();

    words.push(currentWord);
    return this.shuffle(words);
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private shuffle(arr: any[], count?: number): any[] {
    const copyOfArr = [...arr];

    for (let i = copyOfArr.length; i > 0; --i) {
      copyOfArr.push(copyOfArr.splice(Math.random() * i | 0, 1)[0]);
    }

    return count ? copyOfArr.splice(0, count) : copyOfArr;
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      panelClass: 'primary'
    });
  }

}
