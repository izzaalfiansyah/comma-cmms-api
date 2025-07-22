import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from './asset.entity';
import { User } from './user.entity';

@Entity('maintenance_schedules')
export class MaintenanceSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scheduleDate: Date;

  @Column()
  scheduleType: string; // (e.g. "daily", "weekly", "monthly")

  @ManyToOne(() => Asset, (asset) => asset.id)
  asset: Asset;

  @ManyToOne(() => User, (user) => user.id)
  assignedTo: User;
}
