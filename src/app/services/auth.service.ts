import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { FirebaseService } from './parents/firebase.service';
import { environment } from '../../environments/environment.prod';
import { auth, User } from 'firebase';

import { Auth } from '../models/auth.interface';

@Injectable()
export class AuthService extends FirebaseService {
  constructor(snackBar: MatSnackBar) {
    super(snackBar);
  }

  signupUser(authData: Auth): Promise<void> {
    return auth().createUserWithEmailAndPassword(authData.email, authData.password)
      .then((user: User) => this.sendEmailConfirmation(user))
      .then(() => auth().signOut())
      .catch(this.firebaseErrorHandler.bind(this))
    ;
  }

  sendEmailConfirmation(user?: User): Promise<void> {
    if (!user) user = this.getCurrentUser();

    return user.sendEmailVerification()
      .catch(this.firebaseErrorHandler.bind(this))
    ;
  }

  getCurrentUser(): User {
    return auth().currentUser;
  }
}
