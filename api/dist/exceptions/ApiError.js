"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static UnauthorizedError(message, errors = []) {
        return new ApiError(401, message, errors);
    }
    static InternalServerError(message, errors = []) {
        return new ApiError(500, message, errors);
    }
}
exports.default = ApiError;
