import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CredentialsDto } from './dtos/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public signUp(@Body() credentialsDto: CredentialsDto) {
    return this.authService.signUp(credentialsDto);
  }

  @Post('signin')
  public signIn(@Body() credentialsDto: CredentialsDto) {
    return this.authService.signIn(credentialsDto);
  }
}
