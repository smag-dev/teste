"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const Cart_1 = require("./entity/Cart");
const CartProduct_1 = require("./entity/CartProduct");
class Controller {
    async create(req, res) {
        try {
            const cart = new Cart_1.Cart();
            cart.userId = req.body.userId;
            await data_source_1.AppDataSource.manager.save(cart);
            const product = new CartProduct_1.CartProduct();
            product.productId = req.body.productId;
            product.price = req.body.price;
            product.quantity = req.body.quantity;
            product.shoppingCartId = cart.shoppingCartId;
            await data_source_1.AppDataSource.manager.save(product);
            res.status(201).json({
                shoppingCartId: cart.shoppingCartId,
                message: "Produto adicionado com sucesso",
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }
    async getOne(req, res) {
        try {
            const { shoppingCartId } = req.params;
            const cartRepository = data_source_1.AppDataSource.getRepository(Cart_1.Cart);
            const cart = await cartRepository.findOneBy({
                shoppingCartId: parseInt(shoppingCartId),
            });
            if (!cart) {
                res.status(404).json({ message: "Não existe carrinho" });
            }
            const cartProductRepository = data_source_1.AppDataSource.getRepository(CartProduct_1.CartProduct);
            const products = await cartProductRepository.findBy({
                shoppingCartId: parseInt(shoppingCartId),
            });
            let totalPrice = 0;
            let totalQuantity = 0;
            let productsOutput = [];
            for (let i = 0; i < products.length; i++) {
                totalPrice += products[i].price;
                totalQuantity += products[i].quantity;
                productsOutput.push({
                    productId: products[i].productId,
                    price: products[i].price,
                    quantity: products[i].quantity,
                });
            }
            const userId = cart === null || cart === void 0 ? void 0 : cart.userId;
            res.status(200).json({
                shoppingCartId: shoppingCartId,
                userId: userId,
                totalPrice: totalPrice,
                totalQuantity: totalQuantity,
                products: productsOutput,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }
    async update(req, res) {
        try {
            const { shoppingCartId } = req.params;
            const { productId, price, quantity } = req.body;
            const cartRepository = data_source_1.AppDataSource.getRepository(Cart_1.Cart);
            const cart = await cartRepository.findOneBy({
                shoppingCartId: parseInt(shoppingCartId),
            });
            if (!cart) {
                res.status(404).json({ message: "Não existe carrinho" });
            }
            const cartProductRepository = data_source_1.AppDataSource.getRepository(CartProduct_1.CartProduct);
            const cartProduct = await cartProductRepository.findOneBy({
                shoppingCartId: parseInt(shoppingCartId),
                productId: parseInt(productId),
            });
            if (cartProduct) {
                cartProduct.price = parseFloat(price);
                cartProduct.quantity = parseInt(quantity);
                await data_source_1.AppDataSource.manager.save(cartProduct);
            }
            else {
                const newCartProduct = new CartProduct_1.CartProduct();
                newCartProduct.shoppingCartId = parseInt(shoppingCartId);
                newCartProduct.productId = productId;
                newCartProduct.price = price;
                newCartProduct.quantity = quantity;
                await data_source_1.AppDataSource.manager.save(newCartProduct);
            }
            res.status(200).json({ message: "Atualizou o carrinho" });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }
    async delete(req, res) {
        try {
            const { productId, shoppingCartId } = req.params;
            const cartRepository = data_source_1.AppDataSource.getRepository(Cart_1.Cart);
            const cart = await cartRepository.findOneBy({
                shoppingCartId: parseInt(shoppingCartId),
            });
            if (!cart) {
                return res.status(404).json({ message: "Carrinho não existe" });
            }
            const cartProductRepository = data_source_1.AppDataSource.getRepository(CartProduct_1.CartProduct);
            const cartProductToRemove = await cartProductRepository.findOneBy({
                shoppingCartId: parseInt(shoppingCartId),
                productId: parseInt(productId),
            });
            if (!cartProductToRemove) {
                return res
                    .status(404)
                    .json({ message: "Produto não existe no carrinho" });
            }
            await cartProductRepository.remove(cartProductToRemove);
            return res.status(200).json({ message: "Produto eliminado" });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }
}
exports.default = new Controller();
