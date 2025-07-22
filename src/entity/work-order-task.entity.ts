import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkOrder } from './work-order.entity';
import { User } from './user.entity';

@Entity('work_order_tasks')
export class WorkOrderTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  status: string; // (e.g. "open", "in_progress", "completed")

  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.id)
  workOrder: WorkOrder;

  @ManyToOne(() => User, (user) => user.id)
  assignedTo: User;
}
