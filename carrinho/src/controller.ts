import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Cart } from "./entity/Cart";
import { CartProduct } from "./entity/CartProduct";

interface IProduct {
  productId: number;
  price: number;
  quantity: number;
}

class Controller {
  async create(req: Request, res: Response) {
    try {
      const cart = new Cart();
      cart.userId = req.body.userId;
      await AppDataSource.manager.save(cart);
      const product = new CartProduct();
      product.productId = req.body.productId;
      product.price = req.body.price;
      product.quantity = req.body.quantity;
      product.shoppingCartId = cart.shoppingCartId;
      await AppDataSource.manager.save(product);
      res.status(201).json({
        shoppingCartId: cart.shoppingCartId,
        message: "Produto adicionado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { shoppingCartId } = req.params;
      const cartRepository = AppDataSource.getRepository(Cart);
      const cart = await cartRepository.findOneBy({
        shoppingCartId: parseInt(shoppingCartId),
      });
      if (!cart) {
        res.status(404).json({ message: "Não existe carrinho" });
      }

      const cartProductRepository = AppDataSource.getRepository(CartProduct);
      const products = await cartProductRepository.findBy({
        shoppingCartId: parseInt(shoppingCartId),
      });
      let totalPrice = 0;
      let totalQuantity = 0;
      let productsOutput: IProduct[] = [];
      for (let i = 0; i < products.length; i++) {
        totalPrice += products[i].price;
        totalQuantity += products[i].quantity;
        productsOutput.push({
          productId: products[i].productId,
          price: products[i].price,
          quantity: products[i].quantity,
        });
      }

      const userId = cart?.userId;
      res.status(200).json({
        shoppingCartId: shoppingCartId,
        userId: userId,
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
        products: productsOutput,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { shoppingCartId } = req.params;
      const { productId, price, quantity } = req.body;
      const cartRepository = AppDataSource.getRepository(Cart);
      const cart = await cartRepository.findOneBy({
        shoppingCartId: parseInt(shoppingCartId),
      });
      if (!cart) {
        res.status(404).json({ message: "Não existe carrinho" });
      }
      const cartProductRepository = AppDataSource.getRepository(CartProduct);
      const cartProduct = await cartProductRepository.findOneBy({
        shoppingCartId: parseInt(shoppingCartId),
        productId: parseInt(productId),
      });

      if (cartProduct) {
        cartProduct.price = parseFloat(price);
        cartProduct.quantity = parseInt(quantity);
        await AppDataSource.manager.save(cartProduct);
      } else {
        const newCartProduct = new CartProduct();
        newCartProduct.shoppingCartId = parseInt(shoppingCartId);
        newCartProduct.productId = productId;
        newCartProduct.price = price;
        newCartProduct.quantity = quantity;
        await AppDataSource.manager.save(newCartProduct);
      }
      res.status(200).json({ message: "Atualizou o carrinho" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { productId, shoppingCartId } = req.params;
      const cartRepository = AppDataSource.getRepository(Cart);
      const cart = await cartRepository.findOneBy({
        shoppingCartId: parseInt(shoppingCartId),
      });
      if (!cart) {
        return res.status(404).json({ message: "Carrinho não existe" });
      }

      const cartProductRepository = AppDataSource.getRepository(CartProduct);
      const cartProductToRemove = await cartProductRepository.findOneBy({
        shoppingCartId: parseInt(shoppingCartId),
        productId: parseInt(productId),
      });
      if (!cartProductToRemove) {
        return res
          .status(404)
          .json({ message: "Produto não existe no carrinho" });
      }
      await cartProductRepository.remove(cartProductToRemove);
      return res.status(200).json({ message: "Produto eliminado" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}

export default new Controller();
