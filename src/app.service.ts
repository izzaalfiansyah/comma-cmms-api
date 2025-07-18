import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { hashSync } from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_PROVIDER') private userRepository: Repository<User>,
  ) {}

  async getHello() {
    await this.userRepository.save({
      email: 'superadmin@admin.com',
      password: hashSync('superadmin', 10),
      name: 'Muhammad Izza Alfiansyah',
    });

    return {
      hello: 'World',
    };
  }
}
