import { Router } from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/authMiddleware";
import { check } from "express-validator";

const router = Router();

/* rota para user registar */
router.post(
  "/users/register",
  [
    check("email", "email inválido.")
      .toLowerCase() /* toLowerCase para forçar a converter obrigatoriamente para caracteres minusculos */
      .isEmail(),
    check("password", "password com minimo de 5 caractéres").isLength({
      min: 8,
    }),
  ],
  UserController.create
);
/* rota para user fazer login */
router.post(
  "/users/login",
  [
    check("email")
      .toLowerCase() /* toLowerCase para forçar a converter obrigatoriamente para caracteres minusculos */
      .isEmail()
      .withMessage("email inválido"),
  ],
  UserController.login
);
/* rota para obter users */
router.get("/users/", authMiddleware, UserController.getAll);

/* rota para obter um user  */
router.get("/users/:id", authMiddleware, UserController.getOne);

export default router;
