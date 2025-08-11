"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departmentController_1 = require("../controller/departmentController");
const departmentRoute = express_1.default.Router();
departmentRoute.post("/create-department", departmentController_1.createDepartment);
departmentRoute.get("/all-departments", departmentController_1.getDepartments);
exports.default = departmentRoute;
