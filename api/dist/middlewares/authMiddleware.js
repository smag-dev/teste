"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
dotenv_1.default.config();
exports.default = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(ApiError_1.default.UnauthorizedError("Nenhum header de autorização", [
            "Nenhum header de autorização",
        ]));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(ApiError_1.default.UnauthorizedError("Token com formato incorreto", [
            "Token com formato incorreto",
        ]));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.JWT_ACCESS_SECRET_KEY));
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            next(ApiError_1.default.UnauthorizedError("token inválido", [{ error }]));
        }
    }
};
