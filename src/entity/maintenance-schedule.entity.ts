import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from './asset.entity';
import { User } from './user.entity';

@Entity('maintenance_schedules')
export class MaintenanceSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column('enum', {
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily',
  })
  type: string;

  @ManyToOne(() => Asset, (asset) => asset.id)
  asset: Asset;

  @ManyToOne(() => User, (user) => user.id)
  assignedTo: User;
}
