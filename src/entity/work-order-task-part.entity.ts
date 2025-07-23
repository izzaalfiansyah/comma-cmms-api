import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Part } from './part.entity';
import { WorkOrderTask } from './work-order-task.entity';

@Entity('work_order_task_parts')
export class WorkOrderTaskPart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  quantity: number;

  @ManyToOne(() => Part, (part) => part.id)
  part: Part;

  @ManyToOne(() => WorkOrderTask, (workOrderTask) => workOrderTask.id)
  workOrderTask: WorkOrderTask;

  @Column('integer')
  subtotal: number;
}
