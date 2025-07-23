import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Part } from './part.entity';
import { PurchaseOrder } from './purchase_order.entity';

@Entity('purchase_order_parts')
export class PurchaseOrderPart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.id)
  purchaseOrder: PurchaseOrder;

  @ManyToOne(() => Part, (part) => part.id, { eager: true })
  part: Part;

  @Column('integer')
  quantity: number;

  @Column('integer')
  subtotal: number;
}
