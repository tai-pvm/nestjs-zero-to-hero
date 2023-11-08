import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UsersRepository } from '@/users/users.repository';

import { CredentialsDto } from './dtos/credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ) {}

  public async signUp(credentialsDto: CredentialsDto) {
    return this.usersRepository.createUser(credentialsDto);
  }

  public async signIn(credentialsDto: CredentialsDto) {
    const { username, password } = credentialsDto;

    const user = await this.usersRepository.findOneBy({ username });
    if (!user) throw new UnauthorizedException('Username does not exit');

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Invalid password');

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
