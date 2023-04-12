"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartController_1 = __importDefault(require("../controllers/CartController"));
const router = (0, express_1.Router)();
router.post("/cart", CartController_1.default.addProductToCart);
router.get("/cart/:shoppingCartId", CartController_1.default.getOne);
router.patch("/cart/:shoppingCartId", CartController_1.default.update);
router.delete("/cart/:shoppingCartId/:productId", CartController_1.default.delete);
exports.default = router;
