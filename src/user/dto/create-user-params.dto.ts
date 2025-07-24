import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserParams {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordConfirm: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  roleId: number;

  phone?: string;

  address?: string;
}
