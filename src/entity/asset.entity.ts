import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from './location.entity';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('integer', {
    default: 0,
  })
  qantity: number;

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
  created_at: Date;
}
