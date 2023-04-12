"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./router"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = String(process.env.MONGO_URI);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static("static"));
const startApp = async () => {
    try {
        mongoose_1.default.set("strictQuery", true);
        await mongoose_1.default.connect(MONGO_URI);
        console.log("Successefully connected to db");
        app.listen(PORT, () => {
            console.log(`Server started on PORT: ${PORT}`);
            console.log(`http://localhost:${PORT}/`);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
startApp();
app.use(router_1.default);
