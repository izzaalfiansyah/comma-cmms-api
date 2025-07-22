import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 'asset',
  })
  entity_type: string;

  @Column()
  entity_id: number;

  @Column()
  file: string;

  @Column('timestamp', {
    default: () => 'current_timestamp',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;
}
