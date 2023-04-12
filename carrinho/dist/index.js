"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
const router_1 = __importDefault(require("./router"));
dotenv_1.default.config();
const PORT = process.env.PORT || 7001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
data_source_1.AppDataSource.initialize()
    .then(async () => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
        console.log(`http://localhost:${PORT}/`);
    });
    app.use(router_1.default);
})
    .catch((error) => console.log(error));
