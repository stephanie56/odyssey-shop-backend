import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column({ length: 100 })
  title: string;

  @Column()
  description: string;

  @Column()
  imgUrl: string;

  @Column()
  price: number;

  @Column()
  count: number;

  @Column()
  origin: string;
}
