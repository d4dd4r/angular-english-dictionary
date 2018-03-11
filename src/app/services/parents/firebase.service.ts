import { MatSnackBar } from '@angular/material';

import { FirebaseError, FirebaseParsedError } from '../../models/firebase.interface';

export class FirebaseService {
  constructor(private snackBar: MatSnackBar) {}

  protected firebaseErrorHandler(error: FirebaseError) {
    const paresedError = this.parseError(error);
    this.snackBar.open(
      paresedError.message,
      paresedError.action,
      {
        duration: 5000,
        panelClass: 'warning'
      }
    );

    Promise.reject(error);
  }

  private parseError(error: FirebaseError): FirebaseParsedError {
    const errorArray = error.code.trim().split('/');
    const action = errorArray[0] ? errorArray[0] : null;
    const message = errorArray[1] ? errorArray[1].split('-').join(' ') : null;

    return {
      message,
      action,
      description: error.message
    };
  }
}
