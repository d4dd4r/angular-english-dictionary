import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { FirebaseService } from './parents/firebase.service';
import { environment } from '../../environments/environment.prod';
import * as firebase from 'firebase';

import { Auth } from '../models/auth.interface';

@Injectable()
export class AuthService extends FirebaseService {
  constructor(snackBar: MatSnackBar) {
    super(snackBar);
  }

  signupUser(auth: Auth): Promise<void> {
    return firebase.auth().createUserWithEmailAndPassword(auth.email, auth.password)
      .then(() => this.sendEmailConfirmation(auth.email))
      .then(() => firebase.auth().signOut())
      .catch(this.firebaseErrorHandler.bind(this))
    ;
  }

  sendEmailConfirmation(email: string): Promise<void> {
    return firebase.auth().currentUser.sendEmailVerification()
      .catch(this.firebaseErrorHandler.bind(this))
    ;
  }
}
