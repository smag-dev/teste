"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
class Service {
    async getAll() {
        const products = await model_1.default.find();
        return products;
    }
}
exports.default = new Service();
