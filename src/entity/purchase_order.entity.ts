import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Asset } from './asset.entity';

@Entity('purchase_orders')
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  status: string; // (e.g. "open", "in_progress", "completed")

  @ManyToOne(() => User, (user) => user.id)
  requestedBy: User;

  @ManyToOne(() => Asset, (asset) => asset.id)
  asset: Asset;
}
