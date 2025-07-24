import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column()
  name: string;

  @ManyToOne(() => Role, (role) => role.id, {
    eager: true,
  })
  role: Role;

  @Column('varchar', { length: 15, nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  photo?: string;

  @Column('boolean', { default: false })
  verified?: boolean;

  @Column('boolean', { default: true })
  available?: boolean;

  @Column('timestamp', {
    nullable: true,
  })
  lastLoginAt?: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  updatedAt?: Date;
}
