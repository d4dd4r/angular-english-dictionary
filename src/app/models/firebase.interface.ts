export interface FirebaseError {
  code: string;
  message: string;
}

export interface FirebaseParsedError {
  message: string;
  action: string;
  description: string;
}
