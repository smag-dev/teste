import { Router } from "express";
import CartController from "../controllers/CartController";
import authMiddleware from "../middlewares/authMiddleware";
//import { check } from "express-validator";

const router = Router();

/*rota para criar carrinho*/
router.post("/cart", CartController.addProductToCart);
//router.post("/cart", authMiddleware, CartController.addProductToCart); // com autorização

/*rota para obter carrinho  */
router.get("/cart/:shoppingCartId", CartController.getOne);
//router.get("/cart/:shoppingCartId", authMiddleware, CartController.getOne); // com autorização

/*rota para adicionar/atualizar produto carrinho*/
router.patch("/cart/:shoppingCartId", CartController.update);
//router.patch("/cart/:shoppingCartId", authMiddleware, CartController.update);// com autorização

/*rota para apagar carrinho*/
router.delete("/cart/:shoppingCartId/:productId", CartController.delete);
//router.delete("/cart/:shoppingCartId/:productId",authMiddleware,CartController.delete); // com autorização

export default router;
