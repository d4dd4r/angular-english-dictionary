import { User } from '../models/user.class';

export class SelfService {
  public self: User;
  public isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = false;
  }

  reset() {
    this.self = null;
    this.isLoggedIn = false;
  }
}
