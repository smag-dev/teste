import { Router } from "express";
import Controller from "./controller";

const router = Router();

/*rota para obter produtos*/
router.get("/", Controller.getAll);

export default router;
