"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
class CartController {
    async addProductToCart(req, res, next) {
        try {
            let id = "";
            let methodType = "POST";
            if (req.body.shoppingCartId) {
                console.log("entrou");
                id = req.body.shoppingCartId;
                methodType = "PATCH";
            }
            const url = String(process.env.MICROSERVICO_CARRINHO_URL) + id;
            const fetch = await import("node-fetch");
            console.log(url);
            console.log(methodType);
            const response = await fetch.default(url, {
                method: methodType,
                body: JSON.stringify(req.body),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            res.status(response.status).json(data);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou na criação do carrinho.", [
                    error.message,
                ]));
            }
        }
    }
    async getOne(req, res, next) {
        try {
            const { shoppingCartId } = req.params;
            const url = String(process.env.MICROSERVICO_CARRINHO_URL) + shoppingCartId;
            const fetch = await import("node-fetch");
            const response = await fetch.default(url);
            const data = await response.json();
            res.status(response.status).json(data);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou na obtenção do carrinho.", [
                    error.message,
                ]));
            }
        }
    }
    async update(req, res, next) {
        try {
            const { shoppingCartId } = req.params;
            const url = String(process.env.MICROSERVICO_CARRINHO_URL) + shoppingCartId;
            const fetch = await import("node-fetch");
            const response = await fetch.default(url, {
                method: "PATCH",
                body: JSON.stringify(req.body),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            res.status(response.status).json(data);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou na atualização produto.", [
                    error.message,
                ]));
            }
        }
    }
    async delete(req, res, next) {
        try {
            const { shoppingCartId, productId } = req.params;
            const url = String(process.env.MICROSERVICO_CARRINHO_URL) +
                shoppingCartId +
                "/" +
                productId;
            const fetch = await import("node-fetch");
            const response = await fetch.default(url, {
                method: "DELETE",
            });
            const data = await response.json();
            res.status(response.status).json(data);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou na eliminação do produto.", [
                    error.message,
                ]));
            }
        }
    }
}
exports.default = new CartController();
