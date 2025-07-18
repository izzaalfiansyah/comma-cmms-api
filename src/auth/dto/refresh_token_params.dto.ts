import { IsNotEmpty } from 'class-validator';

export class RefreshTokenParams {
  @IsNotEmpty()
  token: string;
}
