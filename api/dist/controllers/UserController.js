"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
const express_validator_1 = require("express-validator");
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
class UserController {
    async create(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                next(ApiError_1.default.BadRequest("Validation errors.", errors.array()));
            }
            const user = await UserService_1.default.create(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou a criação do user.", [
                    error.message,
                ]));
            }
        }
    }
    async login(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                next(ApiError_1.default.BadRequest("Validation errors.", errors.array()));
            }
            const user = await UserService_1.default.login(req.body);
            res.status(200).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou o login", [error.message]));
            }
        }
    }
    async getAll(req, res, next) {
        try {
            const users = await UserService_1.default.getAll();
            res.status(200).json(users);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou a obtenção dos users.", [
                    error.message,
                ]));
            }
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService_1.default.getOne(id);
            res.status(201).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                next(ApiError_1.default.InternalServerError("Falhou a obtenção do user.", [
                    error.message,
                ]));
            }
        }
    }
}
exports.default = new UserController();
