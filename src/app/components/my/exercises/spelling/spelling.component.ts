import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import _ from 'lodash';

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
            <h2>{{ currentTranslateWord.translate }}</h2>
          </mat-grid-tile>
          <mat-grid-tile colspan="3" rowspan="2">
            <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
              <mat-form-field class="full-width">
                <input matInput formControlName="english" [maxlength]="currentWord.english.length" placeholder="English word">
                <mat-hint align="start">
                  {{ !form.get('english').value ? 0
                     : form.get('english').value.trim().split(' ').length
                  }} / {{ currentWord.english.split(' ').length }}
                </mat-hint>
                <mat-hint align="end">{{ form.get('english').value.length }} / {{ currentWord.english.length }}</mat-hint>
              </mat-form-field>
              <button mat-raised-button color="primary"
                  [disabled]="!form.valid">Sumbit</button>
            </form>
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
    /deep/ .mat-hint { color: rgba(0, 0, 0, .7) }
    /deep/ .mat-input-placeholder { color: #d4799c }
    /deep/ .mat-form-field-underline { background-color: #d4799c }
  `]
})
export class SpellingComponent implements OnInit, ComponentDeactivateGuard {
  private confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  private allWords: Word[] = [];
  private shuffledWords: Word[];
  public currentWord: Word;
  public form: FormGroup;
  public currentTranslateWord: TranslateWord;
  public successMatches = 0;
  public totalWordsCount = 20;
  public currentWordCount = 1;
  public gameOver = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private wordS: WordService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({ english: ['', []] });
    this.allWords = this.wordS.words;
    this.shuffledWords = this.getShuffledWords();
    this.runExercise();
  }

  canDeactivate() {
    return this.confirm();
  }

  restartGame() {
    this.shuffledWords = this.getShuffledWords();
    this.currentWord = null;
    this.currentWordCount = 1;
    this.successMatches = 0;
    this.runExercise();
    this.gameOver = false;
  }

  onSubmit({ english }: { english: string }) {
    if (english.toLowerCase() === this.currentWord.english.toLowerCase())
      ++this.successMatches && this.openSnackBar('Success');
    else
      this.openSnackBar('Fail');

    this.form.get('english').patchValue('');
    this.checkStatus();
  }

  getResultText(): string {
    if (this.successMatches <= 4) return 'Go to learn words!';
    if (this.successMatches <= 9) return 'Don\'t give up!';
    if (this.successMatches <= 14) return 'Not bad, but you can better!';
    if (this.successMatches <= 19) return 'Good!';
    if (this.successMatches === 20) return 'Well done!';
  }

  private checkStatus() {
    if (this.totalWordsCount === this.currentWordCount) {
      this.gameOver = true;
      return;
    }

    ++this.currentWordCount;
    this.runExercise();
  }


  private runExercise() {
    this.currentWord = this.shuffledWords.shift();
    console.log('this.currentWord', this.currentWord);
    this.currentTranslateWord = this.getTranslateWord();
  }

  private getShuffledWords(): Word[] {
    return _.chain(this.allWords)
      .shuffle()
      .take(this.totalWordsCount)
      .value()
    ;
  }

  private getTranslateWord(): TranslateWord {
    return new TranslateWord(
      this.currentWord.id,
      _.sample(this.currentWord.russian)
    );
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
    })
  }

}