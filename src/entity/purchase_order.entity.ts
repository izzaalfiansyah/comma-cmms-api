import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Part } from './part.entity';
import { PurchaseOrderPart } from './purchase-order-part.entity';

@Entity('purchase_orders')
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => User, (user) => user.id)
  requestedBy: User;

  @OneToMany(() => PurchaseOrderPart, (part) => part.purchaseOrder, {
    eager: true,
  })
  parts: Array<Part>;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  updatedAt?: Date;
}
