import { Router } from "express";
import controller from "./controller";

const router = Router();

router.post("/", controller.create);

router.get("/:shoppingCartId", controller.getOne);

router.patch("/:shoppingCartId", controller.update);

router.delete("/:shoppingCartId/:productId", controller.delete);

export default router;
