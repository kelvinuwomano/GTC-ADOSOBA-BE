"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    }
    catch (error) {
        console.error("Connection failed", error);
        process.exit(1);
    }
};
exports.default = database;
