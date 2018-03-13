import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';

import { FirebaseService } from './parents/firebase.service';

import { AuthData } from '../models/auth-data.interface';

@Injectable()
export class AuthService extends FirebaseService {
  public isLoggedIn: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    snackBar: MatSnackBar,
  ) {
    super(snackBar);
  }

  signInUser(authData: AuthData): Promise<User> {
    return this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then((user: User) => user)
      .catch(this.firebaseErrorHandler.bind(this))
    ;
  }

  signUpUser(authData: AuthData): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then((user: User) => this.sendEmailConfirmation(user))
      .then(() => this.signOut())
      .catch(this.firebaseErrorHandler.bind(this))
    ;
  }

  signOut(): Promise<void> {
    this.isLoggedIn = false;
    return this.afAuth.auth.signOut();
  }

  sendEmailConfirmation(user: User = this.getCurrentUser()): Promise<void> {
    return user.sendEmailVerification()
      .catch(this.firebaseErrorHandler.bind(this))
    ;
  }

  getCurrentUser(): User {
    return this.afAuth.auth.currentUser;
  }
}
