import { User } from '../models/user.class';
import { Login } from '../models/login.interface';

export class UserService {
  private _users: User[] = [];
  private lastId = 0;

  constructor() {
    this.users = [
      new User('test@mail.com', '12345', 'Alistart', 'Bro'),
      new User('zed@zed.com', 'blade123', 'Zed', 'Zed'),
    ];
  }

  public get users(): User[] {
    return this._users;
  }

  public set user(user: User) {
    user.id = ++this.lastId;
    this._users.push(user);
  }

  public set users(users: User[]) {
    users.forEach(user => this.user = user);
  }

  userById(id: number): User {
    return this._users.find(user => user.id === id);
  }

  checkCredentials(data: Login): boolean {
    const user = this._users.find(user => user.email.toLowerCase() === data.email.toLowerCase());
    return (user && user.password === data.password);
  }

}