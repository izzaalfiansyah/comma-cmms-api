import { IsNotEmpty } from 'class-validator';

export class StoreLocationParams {
  @IsNotEmpty()
  name: string;

  parentId?: number;
}
