import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class CartProduct {
  @PrimaryColumn()
  shoppingCartId!: number;

  @PrimaryColumn()
  productId!: number;

  @Column()
  price!: number;

  @Column()
  quantity!: number;
}
