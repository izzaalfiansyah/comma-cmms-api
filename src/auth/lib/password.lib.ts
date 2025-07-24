import { compare, hash } from 'bcrypt';

const salt = 10;

export class Password {
  static async make(password: string) {
    return await hash(password, salt);
  }

  static async check(password: string, hash: string) {
    return await compare(password, hash);
  }
}
