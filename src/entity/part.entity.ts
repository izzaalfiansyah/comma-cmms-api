import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parts')
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('integer')
  quantity: number;

  @Column('integer')
  price: number;

  @Column()
  image: string;
}
