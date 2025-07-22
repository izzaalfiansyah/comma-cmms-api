import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Asset } from './asset.entity';

@Entity('purchase_orders')
export class PurchaseOrder {
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
    default: 'open',
  })
  status: string;

  @ManyToOne(() => User, (user) => user.id)
  requestedBy: User;

  @ManyToOne(() => Asset, (asset) => asset.id)
  asset: Asset;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  updatedAt?: Date;
}
