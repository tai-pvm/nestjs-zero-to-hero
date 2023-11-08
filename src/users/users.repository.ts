import {
  ConflictException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { DataSource, Repository } from 'typeorm';

import { CredentialsDto } from '@/auth/dtos/credentials.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  public async createUser(credentialsDto: CredentialsDto) {
    const { username, password } = credentialsDto;

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const newUser = this.create({ username, password: hashedPassword });

    try {
      await this.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
