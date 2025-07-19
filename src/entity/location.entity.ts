import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asset } from './asset.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Location, (location) => location.children)
  parent: Location;

  @OneToMany(() => Location, (location) => location.parent)
  children: Array<Location>;

  @OneToMany(() => Asset, (asset) => asset.location)
  assets: Array<Asset>;
}
