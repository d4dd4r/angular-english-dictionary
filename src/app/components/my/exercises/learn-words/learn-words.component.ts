import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Word } from '../../../../models/word.class';
import { WordService } from '../../../../services/word.service';

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
              {{ translate.russian[0] }}
            </button>
          </mat-grid-tile>
          <mat-grid-tile colspan="3" rowspan="2">
            <h3 class="half">Success matches: {{ successMatches }}</h3>
            <h3 class="half">Words: {{ currentWordCount }}/{{ totalWordsCount }}</h3>
          </mat-grid-tile>
        </mat-grid-list>
        <ng-template #gameOverBlock>
          <h2>Game over</h2>
          <h3 class="half">Success matches: {{ successMatches }}</h3>
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
  private shuffledWords: Word[];
  public currentTranslates: Word[];
  public currentWord: Word;
  public totalWordsCount = 20;
  public currentWordCount = 1;
  public successMatches = 0;
  public gameOver = false;

  constructor(
    private snackBar: MatSnackBar,
    private wordS: WordService,
  ) {}

  ngOnInit() {
    this.shuffledWords = this.shuffle(this.wordS.words, this.totalWordsCount);
    this.runExercise();
  }

  checkAnswer(id: number) {
    if (id === this.currentWord.id) ++this.successMatches && this.openSnackBar('Success');
    else this.openSnackBar('Fail');

    this.checkStatus();
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
    const words = (<Word[]>this.shuffle(this.wordS.words, 6))
      .filter(word => word.id !== currentWord.id);
    
    if (words.length === 6) words.shift();

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
