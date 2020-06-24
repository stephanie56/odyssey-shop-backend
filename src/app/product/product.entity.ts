import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('varchar', { length: 500 })
  description: string;

  @Column('varchar', { length: 500, nullable: true })
  imgUrl: string;

  // precision represents total length of value including decimal places
  // scale represents the number of digits after decimal point
  @Column('decimal', { precision: 13, scale: 2, default: 0 })
  price: number;

  // integer between -8388608 and 8388607
  @Column('mediumint')
  count: number;

  @Column('varchar', { length: 20 })
  origin: string;

  @ManyToOne(
    type => Category,
    category => category.products,
  )
  category: Category;
}
