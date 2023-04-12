"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../model/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const TokenService_1 = __importDefault(require("./TokenService"));
class UserService {
    async create(user) {
        const { email, password } = user;
        const existUser = await UserModel_1.default.findOne({ email: email });
        if (existUser) {
            throw new Error("User já existe.");
        }
        const passwordencrypted = await bcrypt_1.default.hash(password, 7);
        const newUser = { email, password: passwordencrypted };
        const newUserDb = await UserModel_1.default.create(newUser);
        const token = TokenService_1.default.generateToken(newUserDb);
        return { ...token, newUserDb };
    }
    async login(user) {
        const { email, password } = user;
        const existUser = await UserModel_1.default.findOne({ email });
        if (!existUser) {
            throw new Error("User não existe!");
        }
        const validPassword = bcrypt_1.default.compareSync(password, existUser.password);
        if (!validPassword) {
            throw new Error("Password invalida.");
        }
        const passwordencrypted = await bcrypt_1.default.hash(password, 7);
        let newUser = await UserModel_1.default.findOneAndUpdate({ email: email }, { lastLogin: Date.now() });
        const tokens = TokenService_1.default.generateToken(existUser);
        return { ...tokens, existUser };
    }
    async getAll() {
        const users = await UserModel_1.default.find();
        return users;
    }
    async getOne(id) {
        const user = await UserModel_1.default.findById(id);
        return user;
    }
}
exports.default = new UserService();
