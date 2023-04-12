"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
router.post("/", controller_1.default.create);
router.get("/:shoppingCartId", controller_1.default.getOne);
router.patch("/:shoppingCartId", controller_1.default.update);
router.delete("/:shoppingCartId/:productId", controller_1.default.delete);
exports.default = router;
