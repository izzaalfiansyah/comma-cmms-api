import { Inject, Injectable } from '@nestjs/common';
import { CommonFilter } from 'src/dto/common-filter.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_PROVIDER') private readonly userRepository: Repository<User>,
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
}
