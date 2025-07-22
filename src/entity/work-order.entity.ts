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
  title: string;

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
    default: 'open',
  })
  status: string;

  @Column('enum', {
    enum: ['low', 'medium', 'high', 'critical'],
  })
  priority: string;

  @ManyToOne(() => User, (user) => user.id)
  requestedBy: User;

  @ManyToOne(() => Location, (location) => location.id)
  location: Location;

  @ManyToOne(() => Asset, (asset) => asset.id)
  asset: Asset;

  @OneToMany(() => WorkOrderTask, (task) => task.workOrder)
  tasks: WorkOrderTask[];

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  updatedAt?: Date;
}
