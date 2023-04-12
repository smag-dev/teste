import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  shoppingCartId!: number;

  @Column()
  userId!: number;
}
