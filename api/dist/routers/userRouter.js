"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/users/register", [
    (0, express_validator_1.check)("email", "email inválido.")
        .toLowerCase()
        .isEmail(),
    (0, express_validator_1.check)("password", "password com minimo de 5 caractéres").isLength({
        min: 8,
    }),
], UserController_1.default.create);
router.post("/users/login", [
    (0, express_validator_1.check)("email")
        .toLowerCase()
        .isEmail()
        .withMessage("email inválido"),
], UserController_1.default.login);
router.get("/users/", authMiddleware_1.default, UserController_1.default.getAll);
router.get("/users/:id", authMiddleware_1.default, UserController_1.default.getOne);
exports.default = router;
