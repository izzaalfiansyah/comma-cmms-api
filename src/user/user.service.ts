import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CommonFilter } from 'src/dto/common-filter.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserParams } from './dto/create-user-params.dto';
import { Password } from 'src/auth/lib/password.lib';
import { Role } from 'src/entity/role.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_PROVIDER') private readonly userRepository: Repository<User>,
    @Inject('ROLE_PROVIDER') private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(params: CommonFilter) {
    let query = this.userRepository.createQueryBuilder('user');

    if (params.q) {
      query = query.where('user.name like :q', { q: `%${params.q}%` });
    }

    const totalUsers = await query.getCount();

    const limit = params.limit || 10;
    const offset = params.offset || 0;

    query = query.take(limit).skip(offset);

    const users = await query.getMany();

    return {
      success: true,
      message: 'Users retrieved successfully',
      data: {
        total: totalUsers,
        users,
      },
    };
  }

  async store(params: CreateUserParams) {
    if (params.password != params.passwordConfirm) {
      throw new HttpException('password not match', 422);
    }

    const password = await Password.make(params.password);
    const role = await this.roleRepository.findOneBy({ id: params.roleId });

    if (!role) {
      throw new HttpException('role not found', 400);
    }

    await this.userRepository.save({
      address: params.address,
      email: params.email,
      name: params.name,
      password: password,
      phone: params.phone,
      role: role,
      verified: false,
      available: true,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: 'User successfully registered',
    };
  }
}
