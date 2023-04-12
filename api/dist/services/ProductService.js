"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const FileService_1 = __importDefault(require("./FileService"));
class ProductService {
    async create(product, image) {
        if (image) {
            const fileservice = new FileService_1.default();
            const fileName = fileservice.save(image);
            product = { ...product, image: fileName };
        }
        const createdProduct = await ProductModel_1.default.create(product);
        return createdProduct;
    }
    async getAll() {
        const products = await ProductModel_1.default.find();
        return products;
    }
    async getOne(id) {
        const product = await ProductModel_1.default.findById(id);
        return product;
    }
    async update(id, product, image) {
        if (image) {
            const fileservice = new FileService_1.default();
            const fileName = fileservice.save(image);
            product = { ...product, image: fileName };
        }
        let productObj = { ...product, updatedAt: Date.now() };
        const updatedProduct = await ProductModel_1.default.findByIdAndUpdate(id, productObj, {
            new: true,
        });
        return updatedProduct;
    }
    async delete(id) {
        const deletedProduct = await ProductModel_1.default.findByIdAndDelete(id);
        return deletedProduct;
    }
}
exports.default = new ProductService();
