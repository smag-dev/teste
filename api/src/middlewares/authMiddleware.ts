import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ApiError from "../exceptions/ApiError";

dotenv.config();

interface TokenPayload {
  id: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  /* vai buscar o header de autorização */
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    //return res.status(401).json({ message: "Nenhum header de autorização" });
    return next(
      ApiError.UnauthorizedError("Nenhum header de autorização", [
        "Nenhum header de autorização",
      ])
    );
  }
  /* header contituido por "Bearer token" */
  const token = authHeader.split(" ")[1];
  if (!token) {
    /*return res.status(401).json({ message: "Token com formato incorreto" });*/
    return next(
      ApiError.UnauthorizedError("Token com formato incorreto", [
        "Token com formato incorreto",
      ])
    );
  }

  /* verifica se o token é válido dando erro caso seja inválido */
  try {
    const decoded = jwt.verify(
      token,
      String(process.env.JWT_ACCESS_SECRET_KEY)
    ) as TokenPayload;
    next();
  } catch (error) {
    /*return res.status(401).json({"token inválido" });*/
    if (error instanceof Error) {
      next(ApiError.UnauthorizedError("token inválido", [{ error }]));
    }
  }
};
