import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  public username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak'
  })
  public password: string;
}
