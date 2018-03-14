import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { Word } from '../models/word.class';

@Injectable()
export class FbWordService {
  private wordCol: AngularFirestoreCollection<Word>;

  constructor(
    private authS: AuthService,
    private fsS: AngularFirestore,
  ) {
    const user = this.authS.getCurrentUser();
    if (user) {
      this.wordCol = this.fsS
        .collection('users')
        .doc(user.email)
        .collection('words')
      ;
    }
  }

  public get words(): Observable<Word[]> {
    return this.wordCol.valueChanges();
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
