import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkOrder } from './work-order.entity';
import { WorkOrderTaskPart } from './work-order-task-part.entity';

@Entity('work_order_tasks')
export class WorkOrderTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description?: string;

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

  @OneToMany(() => WorkOrderTaskPart, (part) => part.workOrderTask, {
    eager: true,
  })
  parts: Array<WorkOrderTaskPart>;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  updatedAt?: Date;
}
