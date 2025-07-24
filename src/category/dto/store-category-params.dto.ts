import { IsNotEmpty } from 'class-validator';

export class StoreCategoryParams {
  @IsNotEmpty()
  name: string;
}
