import { IsNotEmpty } from 'class-validator';

export class LoginParams {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
