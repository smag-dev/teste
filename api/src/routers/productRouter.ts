import { Router } from "express";
import ProductController from "../controllers/ProductController";
import authMiddleware from "../middlewares/authMiddleware";
import { check } from "express-validator";

const router = Router();

/*rota para criar produto*/
router.post(
  "/products",
  [
    check("name", "o nome não pode ser vazia").not().isEmpty(),
    check("description", "a descrição não pode ser vazia").not().isEmpty(),
    check("category", "a categoria não pode ser vazia").not().isEmpty(),
    check("price", "o preço precisa de ser um número").isNumeric(),
    check("quantity", "a quantidade precisa de ser um número").isNumeric(),
  ],
  authMiddleware,
  ProductController.create
);

/*rota para obter produtos*/
router.get("/products", ProductController.getAll);

/*rota para obter um produto*/
router.get("/products/:id", ProductController.getOne);

/*rota para atualizar produto*/
router.put(
  "/products/:id",
  [
    check("name", "o nome não pode ser vazia").not().isEmpty(),
    check("description", "a descrição não pode ser vazia").not().isEmpty(),
    check("category", "a categoria não pode ser vazia").not().isEmpty(),
    check("price", "o preço precisa de ser um número").isNumeric(),
    check("quantity", "a quantidade precisa de ser um número").isNumeric(),
  ],
  authMiddleware,
  ProductController.update
);

/*rota para apagar produto*/
router.delete("/products/:id", authMiddleware, ProductController.delete);

export default router;
