import { Request, Response } from "express";
import Service from "./service";

interface IProduct {
  productId: number;
  price: number;
}

class Controller {
  async getAll(req: Request, res: Response) {
    try {
      const products = await Service.getAll();
      let productsOutput: IProduct[] = [];
      if (products !== null) {
        for (let i = 0; i < products.length; i++) {
          productsOutput.push({
            productId: products[i].productId,
            price: products[i].price,
          });
        }
      }
      res.status(200).json(productsOutput);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ mensagem: error.message });
      }
    }
  }
}

export default new Controller();
