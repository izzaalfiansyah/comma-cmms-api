import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserParams } from './dto/users-params.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_PROVIDER') private readonly userRepository: Repository<User>,
  ) {}

  async findAll(params: UserParams) {
    let query = this.userRepository.createQueryBuilder('user');
    const limit = params.limit || 10;
    const offset = params.offset || 0;

    query = query.take(limit).skip(offset);

    if (params.q) {
      query = query.where('user.name like :q', { q: `%${params.q}%` });
    }

    const users = await query.getMany();

    return {
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users,
      },
    };
  }
}
