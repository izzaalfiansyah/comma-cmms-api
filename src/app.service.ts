import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';
import { Password } from './auth/lib/password.lib';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_PROVIDER') private userRepository: Repository<User>,
    @Inject('ROLE_PROVIDER') private roleRepository: Repository<Role>,
  ) {}

  getHello() {
    return {
      hello: 'World',
    };
  }

  async migrate() {
    try {
      const roles = ['admin', 'user', 'technician'];

      await this.roleRepository.deleteAll();
      await this.roleRepository.save(
        roles.map((role, i) => {
          return {
            id: i + 1,
            name: role,
          };
        }),
      );

      const admin_role = await this.roleRepository.findOneBy({ name: 'admin' });
      const password = await Password.make('superadmin');

      await this.userRepository.deleteAll();
      await this.userRepository.save({
        id: 1,
        email: 'superadmin@admin.com',
        name: 'Muhammad Izza Alfiansyah',
        role: admin_role as Role,
        password,
      });

      return {
        success: true,
        message: 'migration successfully',
      };
    } catch (e: any) {
      throw new HttpException('running migration failed', 500);
    }
  }
}
