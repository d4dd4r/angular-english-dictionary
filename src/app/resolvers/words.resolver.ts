import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/skip';

import { WordService } from '../services/word.service';

@Injectable()
export class WordsResolver implements Resolve<void> {
  constructor(
    private wordS: WordService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<void> {
    return new Promise(resolve => {
      this.wordS.init();
      const sub = this.wordS.words
        .asObservable()
        .skip(1)
        .subscribe(() => {
          sub.unsubscribe();
          resolve();
        })
      ;
    });
  }
}
