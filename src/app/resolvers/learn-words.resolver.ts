import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { WordService } from '../services/word.service';
import { Word } from '../models/word.class';

@Injectable()
export class LearnWordsResolver implements Resolve<Word[]> {
  constructor(
    private router: Router,
    private wordS: WordService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Word[] {
    const words = this.wordS.words;
    if (words.length < 20) this.router.navigate(['my', 'exercises']);
    else return words;
  }
}