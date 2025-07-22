import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Asset } from './asset.entity';
import { Location } from './location.entity';
import { WorkOrderTask } from './work-order-task.entity';

@Entity('work_orders')
export class WorkOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('enum', {
    enum: [
      'open',
      'in_progress',
      'completed',
      'pending',
      'canceled',
      'rejected',
      'approved',
      'delivered',
      'paid',
    ],
  })
  status: string;

  @ManyToOne(() => User, (user) => user.id)
  requestedBy: User;

  @ManyToOne(() => Location, (location) => location.id)
  location: Location;

  @ManyToOne(() => Asset, (asset) => asset.id)
  asset: Asset;

  @OneToMany(() => WorkOrderTask, (task) => task.workOrder)
  tasks: WorkOrderTask[];
}
