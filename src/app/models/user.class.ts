export class User {
  public id: number;

  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
  ) {}
}
