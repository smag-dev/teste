"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../services/ProductService"));
const express_validator_1 = require("express-validator");
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
class ProductController {
    async create(req, res, next) {
        var _a;
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                next(ApiError_1.default.BadRequest("Validation errors.", errors.array()));
            }
            const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            const product = await ProductService_1.default.create(req.body, image);
            res.status(201).json(product);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou a criação do produto", [
                    error.message,
                ]));
            }
        }
    }
    async getAll(req, res, next) {
        try {
            const url = String(process.env.MICROSERVICO_PRODUTO_URL);
            const fetch = await import("node-fetch");
            const response = await fetch.default(url);
            const data = await response.json();
            res.status(200).json(data);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou na obtenção de produtos.", [
                    error.message,
                ]));
            }
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const product = await ProductService_1.default.getOne(id);
            res.status(200).json(product);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou na obtenção do produto.", [
                    error.message,
                ]));
            }
        }
    }
    async update(req, res, next) {
        var _a;
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                next(ApiError_1.default.BadRequest("Validation errors.", errors.array()));
            }
            const { id } = req.params;
            const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            const product = await ProductService_1.default.update(id, req.body, image);
            res.status(200).json(product);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou na atualização do produto.", [
                    error.message,
                ]));
            }
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const product = await ProductService_1.default.delete(id);
            res.status(200).json(product);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou apagar o produto.", [
                    error.message,
                ]));
            }
        }
    }
}
exports.default = new ProductController();
