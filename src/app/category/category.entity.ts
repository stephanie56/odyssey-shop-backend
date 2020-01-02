import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 20 })
  name: string;

  @ManyToMany(
    type => Product,
    product => product.id,
    {
      cascade: ['insert'],
    },
  )
  products: string[];
}
