"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/products", [
    (0, express_validator_1.check)("name", "o nome não pode ser vazia").not().isEmpty(),
    (0, express_validator_1.check)("description", "a descrição não pode ser vazia").not().isEmpty(),
    (0, express_validator_1.check)("category", "a categoria não pode ser vazia").not().isEmpty(),
    (0, express_validator_1.check)("price", "o preço precisa de ser um número").isNumeric(),
    (0, express_validator_1.check)("quantity", "a quantidade precisa de ser um número").isNumeric(),
], authMiddleware_1.default, ProductController_1.default.create);
router.get("/products", ProductController_1.default.getAll);
router.get("/products/:id", ProductController_1.default.getOne);
router.put("/products/:id", [
    (0, express_validator_1.check)("name", "o nome não pode ser vazia").not().isEmpty(),
    (0, express_validator_1.check)("description", "a descrição não pode ser vazia").not().isEmpty(),
    (0, express_validator_1.check)("category", "a categoria não pode ser vazia").not().isEmpty(),
    (0, express_validator_1.check)("price", "o preço precisa de ser um número").isNumeric(),
    (0, express_validator_1.check)("quantity", "a quantidade precisa de ser um número").isNumeric(),
], authMiddleware_1.default, ProductController_1.default.update);
router.delete("/products/:id", authMiddleware_1.default, ProductController_1.default.delete);
exports.default = router;
