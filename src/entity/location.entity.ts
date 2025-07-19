import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Asset } from './asset.entity';

@Entity('locations')
@Tree('nested-set')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeParent()
  parent?: Location;

  @TreeChildren()
  children: Array<Location>;

  @OneToMany(() => Asset, (asset) => asset.location)
  assets: Array<Asset>;
}
