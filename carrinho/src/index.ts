import "reflect-metadata";
import express from "express";
//import { Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
/*import { Cart } from "./entity/Cart";
import { CartProduct } from "./entity/CartProduct";
import controller from "./controller";*/
import router from "./router";

dotenv.config();
const PORT = process.env.PORT || 7001;
const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    /*console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );*/

    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`);
      console.log(`http://localhost:${PORT}/`);
    });

    app.use(router);
  })
  .catch((error) => console.log(error));
