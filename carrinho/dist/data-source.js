"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Cart_1 = require("./entity/Cart");
const CartProduct_1 = require("./entity/CartProduct");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const HOST = process.env.DB_HOST;
const PORT = parseInt((_a = process.env.DB_PORT) !== null && _a !== void 0 ? _a : "3306");
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DB_NAME;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: HOST,
    port: PORT,
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    synchronize: true,
    logging: false,
    entities: [Cart_1.Cart, CartProduct_1.CartProduct],
    migrations: [],
    subscribers: [],
});
