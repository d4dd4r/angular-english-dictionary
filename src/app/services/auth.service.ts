import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { FirebaseService } from './parents/firebase.service';
import { environment } from '../../environments/environment.prod';
import { auth, User } from 'firebase';

import { AuthData } from '../models/auth-data.interface';

@Injectable()
export class AuthService extends FirebaseService {
  public isLoggedIn: boolean = false;

  constructor(snackBar: MatSnackBar) {
    super(snackBar);
  }

  signInUser(authData: AuthData): Promise<User> {
    return auth().signInWithEmailAndPassword(authData.email, authData.password)
      .then((user: User) => user)
      .catch(this.firebaseErrorHandler.bind(this))
    ;
  }

  signUpUser(authData: AuthData): Promise<void> {
    return auth().createUserWithEmailAndPassword(authData.email, authData.password)
      .then((user: User) => this.sendEmailConfirmation(user))
      .then(() => this.signOut())
      .catch(this.firebaseErrorHandler.bind(this))
    ;
  }

  signOut(): Promise<void> {
    return auth().signOut();
  }

  sendEmailConfirmation(user: User = this.getCurrentUser()): Promise<void> {
    return user.sendEmailVerification()
      .catch(this.firebaseErrorHandler.bind(this))
    ;
  }

  getCurrentUser(): User {
    return auth().currentUser;
  }
}
