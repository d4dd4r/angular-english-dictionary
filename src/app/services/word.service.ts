import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthService } from './auth.service';
import { Word } from '../models/word.class';

@Injectable()
export class WordService {
  public words = new BehaviorSubject<Word[]>([]);
  private wordCol: AngularFirestoreCollection<Word>;

  constructor(
    private authS: AuthService,
    private fsS: AngularFirestore,
  ) {}

  public init() {
    const user = this.authS.getCurrentUser();
    if (user) {
      this.wordCol = this.fsS
        .collection('users')
        .doc(user.email)
        .collection('words')
      ;

      this.wordCol.valueChanges()
        .subscribe(words => this.words.next(words))
      ;
    }
  }

  public set word(word: Word) {
    this.wordCol.doc(word.english.toLowerCase()).set({ ...word })
      .catch(err => console.log('err', err))
    ;
  }

  public updateWord(word: Word, id: string) {
    const newId = word.english.toLowerCase();
    if (newId === id) {
      this.wordCol.doc(id).update({ ...word })
        .catch(err => console.log('err', err))
      ;
    } else {
      Promise.all([
        this.wordCol.doc(id).delete(),
        this.wordCol.doc(newId).set({ ...word })
      ]).catch(
        err => console.log('err', err)
      );
    }
  }

  public removeWord(word: Word) {
    this.wordCol.doc(word.english.toLowerCase()).delete()
      .catch(err => console.log('err', err))
    ;
  }
}
