import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
            <h2>{{ currentTranslateWord.translate }}</h2>
          </mat-grid-tile>
          <mat-grid-tile colspan="3" rowspan="2">
            <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
              <mat-form-field class="full-width">
                <input matInput #field formControlName="english" [maxlength]="currentWord.english.length" placeholder="English word">
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
          <button mat-raised-button color="primary" (click)="onRestartGame()">Try again</button>
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
export class SpellingComponent extends Exercise implements OnInit, AfterViewInit, ComponentDeactivateGuard {
  @ViewChild('field') private field: ElementRef;
  public form: FormGroup;
  public currentTranslateWord: TranslateWord;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    snackBar: MatSnackBar,
    wordS: WordService,
    dialog: MatDialog,
  ) {
    super(snackBar, wordS, dialog);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({ english: ['', []] });
    this.runExercise();
  }

  ngAfterViewInit() {
    this.field.nativeElement.focus();
    this.cdr.detectChanges();
  }

  onRestartGame() {
    this.restartGame();
    this.runExercise();
  }

  onSubmit({ english }: { english: string }) {
    english.toLowerCase() === this.currentWord.english.toLowerCase()
      ? ++this.successMatches && this.openSnackBar('Success')
      : this.openSnackBar('Fail');

    this.form.get('english').patchValue('');
    this.checkStatus();
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
    if (this.field) this.field.nativeElement.focus();
  }

  private getTranslateWord(): TranslateWord {
    return new TranslateWord(
      this.currentWord.id,
      _.sample(this.currentWord.russian)
    );
  }

}
