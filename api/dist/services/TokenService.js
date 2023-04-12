"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Token {
    generateToken(user) {
        const payload = {
            exp: Math.floor(Date.now() / 1000) + 60 * 15,
            id: user.id,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, String(process.env.JWT_ACCESS_SECRET_KEY));
        return { accessToken };
    }
    validateAccessToken(token) {
        try {
            const userPayload = jsonwebtoken_1.default.verify(token, String(process.env.JWT_ACCESS_SECRET_KEY));
            return userPayload;
        }
        catch (e) {
            return null;
        }
    }
}
exports.default = new Token();
