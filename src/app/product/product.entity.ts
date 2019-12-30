import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoryId: string;

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
