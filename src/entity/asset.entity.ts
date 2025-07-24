import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from './location.entity';
import { Category } from './category.entity';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serialNumber: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  category: Category;

  @Column()
  image: string;

  @Column()
  qrcode: string;

  @Column()
  type: string;

  @ManyToOne(() => Location, (location) => location.id)
  location: Location;

  @Column('date')
  purchase_date: Date;

  @Column('timestamp', {
    default: () => 'current_timestamp',
  })
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  updatedAt?: Date;
}
