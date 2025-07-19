import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  type: string;

  @Column('date')
  purchase_date: Date;

  @Column('timestamp', {
    default: () => 'current_timestamp',
  })
  created_at: Date;
}
