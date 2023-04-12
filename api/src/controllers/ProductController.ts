import { Request, Response, NextFunction } from "express";
import ProductService from "../services/ProductService";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/ApiError";

class ProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      /* apanhar erro das  validações */
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest("Validation errors.", errors.array()));
      }
      /* verifica se existe ficheiro/imagem com um ternario passando null caso não exista*/
      const image = req.files?.image;
      const product = await ProductService.create(req.body, image);
      res.status(201).json(product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou a criação do produto", [
            error.message,
          ])
        );
      }
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const url: string = String(process.env.MICROSERVICO_PRODUTO_URL);
      const fetch = await import("node-fetch");
      const response = await fetch.default(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou na obtenção de produtos.", [
            error.message,
          ])
        );
      }
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.getOne(id);
      res.status(200).json(product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou na obtenção do produto.", [
            error.message,
          ])
        );
      }
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      /* apanhar erro das  validações */
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest("Validation errors.", errors.array()));
      }
      const { id } = req.params;
      /* verifica se existe ficheiro/imagem com um ternario passando null caso não exista*/
      const image = req.files?.image;
      const product = await ProductService.update(id, req.body, image);
      res.status(200).json(product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou na atualização do produto.", [
            error.message,
          ])
        );
      }
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.delete(id);
      res.status(200).json(product);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou apagar o produto.", [
            error.message,
          ])
        );
      }
    }
  }
}

export default new ProductController();
