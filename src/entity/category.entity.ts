import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from './asset.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn() id: number;

  @Column()
  name: string;

  @OneToMany(() => Asset, (asset) => asset.category)
  assets: Array<Asset>;
}
