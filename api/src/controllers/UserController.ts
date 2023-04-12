import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/ApiError";

class UserController {
  /* registo do user  por isso vai criar  user*/
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      /* apanhar erro das  validações */
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest("Validation errors.", errors.array()));
      }
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou a criação do user.", [
            error.message,
          ])
        );
      }
    }
  }
  /* login do user   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      /* apanhar erro das  validações */
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest("Validation errors.", errors.array()));
      }
      const user = await UserService.login(req.body);
      res.status(200).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(ApiError.InternalServerError("Falhou o login", [error.message]));
      }
    }
  }
  /* obter todos os users   */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou a obtenção dos users.", [
            error.message,
          ])
        );
      }
    }
  }
  /* obter user indicado   */
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserService.getOne(id);
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        /* usar o midleware de erros para os erros */
        next(
          ApiError.InternalServerError("Falhou a obtenção do user.", [
            error.message,
          ])
        );
      }
    }
  }
}

export default new UserController();
