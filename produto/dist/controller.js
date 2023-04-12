"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
class Controller {
    async getAll(req, res) {
        try {
            const products = await service_1.default.getAll();
            let productsOutput = [];
            if (products !== null) {
                for (let i = 0; i < products.length; i++) {
                    productsOutput.push({
                        productId: products[i].productId,
                        price: products[i].price,
                    });
                }
            }
            res.status(200).json(productsOutput);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ mensagem: error.message });
            }
        }
    }
}
exports.default = new Controller();
