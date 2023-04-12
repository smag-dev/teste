import { Request, Response, NextFunction } from "express";
import ApiError from "../exceptions/ApiError";
import { Console } from "console";

class CartController {
  async addProductToCart(req: Request, res: Response, next: NextFunction) {
    try {
      let id = "";
      let methodType = "POST";
      if (req.body.shoppingCartId) {
        id = req.body.shoppingCartId;
        methodType = "PATCH";
      }
      const url: string = String(process.env.MICROSERVICO_CARRINHO_URL) + id;
      const fetch = await import("node-fetch");
      console.log(url);
      console.log(methodType);
      const response = await fetch.default(url, {
        method: methodType,
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou na criação do carrinho.", [
            error.message,
          ])
        );
      }
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { shoppingCartId } = req.params;
      const url: string =
        String(process.env.MICROSERVICO_CARRINHO_URL) + shoppingCartId;
      const fetch = await import("node-fetch");
      const response = await fetch.default(url);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou na obtenção do carrinho.", [
            error.message,
          ])
        );
      }
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { shoppingCartId } = req.params;
      const url: string =
        String(process.env.MICROSERVICO_CARRINHO_URL) + shoppingCartId;
      const fetch = await import("node-fetch");
      const response = await fetch.default(url, {
        method: "PATCH",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou na atualização produto.", [
            error.message,
          ])
        );
      }
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { shoppingCartId, productId } = req.params;
      const url: string =
        String(process.env.MICROSERVICO_CARRINHO_URL) +
        shoppingCartId +
        "/" +
        productId;
      const fetch = await import("node-fetch");
      const response = await fetch.default(url, {
        method: "DELETE",
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou na eliminação do produto.", [
            error.message,
          ])
        );
      }
    }
  }
}

export default new CartController();
