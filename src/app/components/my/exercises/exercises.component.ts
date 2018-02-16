import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { WordService } from '../../../services/word.service';

@Component({
  template: `
    <mat-grid-list cols="4" rowHeight="1.5:1">
      <mat-grid-tile>
        <div class="text-center">
          <h3>Learn the words</h3>
          <p class="description"><small>You will need to match the pairs of words with their translations in this exercise</small></p>
          <button mat-raised-button color="primary"
            (click)="onLearnWords()"
            [ngClass]="{ disabled: isWordEnough() }"
            [matTooltip]="isWordEnough() ? 'Your dictionary contains less 20 words' : null">Go</button>
        </div>
      </mat-grid-tile>
      <mat-grid-tile>
        <div class="text-center">
          <h3>Reading</h3>
          <p class="description"><small>You will need to read a random article where the words from your dictionary are used</small></p>
          <button mat-raised-button color="primary" class="disabled"
            matTooltip="{{ premiumUpgradeText }}">Go</button>
        </div>
      </mat-grid-tile>
      <mat-grid-tile>
        <div class="text-center">
          <h3>Listening</h3>
          <p class="description"><small>You will need to listen to random phrases where the words from your dictionary are used</small></p>
          <button mat-raised-button color="primary" class="disabled"
            matTooltip="{{ premiumUpgradeText }}">Go</button>
        </div>
      </mat-grid-tile>
      <mat-grid-tile>
        <div class="text-center">
          <h3>Speaking</h3>
          <p class="description"><small>You can talk to other students in this exercise</small></p>
          <button mat-raised-button color="primary" class="disabled"
            matTooltip="{{ premiumUpgradeText }}">Go</button>
        </div>
      </mat-grid-tile>
      <mat-grid-tile>
        <div class="text-center">
          <h3>Speaking</h3>
          <p class="description"><small>Here you can find a native speaker and to appoint an individual lesson</small></p>
          <button mat-raised-button color="primary" class="disabled"
            matTooltip="{{ premiumUpgradeText }}">Go</button>
        </div>
      </mat-grid-tile>
      <mat-grid-tile>
        <div class="text-center">
          <h3>FAQ</h3>
          <p class="description"><small>This section contains frequently asked questions</small></p>
          <button mat-raised-button color="primary" class="disabled"
            matTooltip="Sorry, this will be available as soon as possible">Go</button>
        </div>
      </mat-grid-tile>
    </mat-grid-list>
    <router-outlet></router-outlet>
  `,
  styles: [`
    button.disabled { background-color: rgba(194, 24, 91, .5) }
    p.description { height: 50px; width: 70%; margin: 10px auto }
  `]
})
export class ExercisesComponent {
  private wordCount: number;
  private wordLimit = 20;
  public premiumUpgradeText = 'Please, upgrade your account to premium';

  constructor(
    private router: Router,
    private wordS: WordService,
  ) {
    this.wordCount = this.wordS.words.length;
  }

  onLearnWords() {
    if (this.isWordEnough()) return;

    this.router.navigate(['my', 'exercise', 'learn-words']);
  }

  isWordEnough(): boolean {
    return this.wordCount < this.wordLimit;
  }

}
