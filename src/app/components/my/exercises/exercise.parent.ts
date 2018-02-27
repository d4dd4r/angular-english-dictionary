import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';

import { Word } from '../../../models/word.class';
import { WordService } from '../../../services/word.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

export class Exercise {
  private confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  private _allWords: Word[] = [];
  private _shuffledWords: Word[] = [];
  private _totalWordsCount = 20;
  private _currentWord: Word;
  private _successMatches = 0;
  private _currentWordCount = 1;
  private _gameOver = false;

  constructor(
    private snackBar: MatSnackBar,
    private wordS: WordService,
    private dialog: MatDialog,
  ) {
    this.allWords = wordS.words;
    this.shuffledWords = this.getShuffledWords();
  }

  protected get allWords() {
    return this._allWords;
  }

  protected set allWords(value: Word[]) {
    this._allWords = value;
  }

  protected get shuffledWords() {
    return this._shuffledWords;
  }

  protected set shuffledWords(value: Word[]) {
    this._shuffledWords = value;
  }

  protected get totalWordsCount() {
    return this._totalWordsCount;
  }

  protected set totalWordsCount(value: number) {
    this._totalWordsCount = value;
  }

  protected get currentWord() {
    return this._currentWord;
  }

  protected set currentWord(value: Word) {
    this._currentWord = value;
  }

  protected get successMatches() {
    return this._successMatches;
  }

  protected set successMatches(value: number) {
    this._successMatches = value;
  }

  protected get currentWordCount() {
    return this._currentWordCount;
  }

  protected set currentWordCount(value: number) {
    this._currentWordCount = value;
  }

  protected get gameOver() {
    return this._gameOver;
  }

  protected set gameOver(value: boolean) {
    this._gameOver = value;
  }

  protected getShuffledWords(): Word[] {
    return _.chain(this.allWords)
      .shuffle()
      .take(this.totalWordsCount)
      .value()
    ;
  }

  protected confirm(): Promise<boolean> {
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

  protected restartGame() {
    this.shuffledWords = this.getShuffledWords();
    this.currentWord = null;
    this.currentWordCount = 1;
    this.successMatches = 0;
    this.gameOver = false;
  }

  protected getResultText(): string {
    if (this.successMatches <= this.totalWordsCount / 5) return 'Go to learn words!';
    if (this.successMatches <= this.totalWordsCount / 2) return 'Don\'t give up!';
    if (this.successMatches <= (this.totalWordsCount - Math.floor(this.totalWordsCount / 3))) return 'Not bad, but you can better!';
    if (this.successMatches <= (this.totalWordsCount - Math.floor(this.totalWordsCount / 5))) return 'Good!';
    if (this.successMatches <= (this.totalWordsCount - Math.floor(this.totalWordsCount / 10))) return 'Nice!';
    if (this.successMatches === this.totalWordsCount) return 'Well done!';
  }

  protected openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      panelClass: 'primary'
    });
  }

  public canDeactivate() {
    return (this.currentWordCount === this.totalWordsCount || this.confirm());
  }

}
