import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cart } from "./entity/Cart";
import { CartProduct } from "./entity/CartProduct";
import dotenv from "dotenv";
dotenv.config();

const HOST = process.env.DB_HOST;
const PORT = parseInt(process.env.DB_PORT ?? "3306");
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DB_NAME;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: HOST,
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: [Cart, CartProduct],
  migrations: [],
  subscribers: [],
});
