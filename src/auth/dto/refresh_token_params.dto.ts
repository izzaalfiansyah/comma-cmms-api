import { IsNotEmpty } from 'class-validator';

export class RefreshTokenParams {
  @IsNotEmpty()
  refresh_token: string;
}
