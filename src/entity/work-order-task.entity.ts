import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkOrder } from './work-order.entity';
import { User } from './user.entity';

@Entity('work_order_tasks')
export class WorkOrderTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.id)
  workOrder: WorkOrder;

  @ManyToOne(() => User, (user) => user.id)
  assignedTo: User;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  updatedAt?: Date;
}
