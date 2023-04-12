"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
class FileService {
    save(file) {
        const fileExtension = file.mimetype.split("/")[1];
        const fileName = (0, uuid_1.v4)() + "." + fileExtension;
        const filePath = path_1.default.resolve("static", fileName);
        file.mv(filePath);
        return fileName;
    }
}
exports.default = FileService;
