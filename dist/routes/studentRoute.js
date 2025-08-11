"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controller/studentController");
const studentRoute = express_1.default.Router();
studentRoute.post("/create-student", studentController_1.createStudent);
studentRoute.get("/department/:departmentId", studentController_1.getStudentByDepartments);
studentRoute.get("/one-student/:id", studentController_1.getOneStudent);
studentRoute.get("/all-student", studentController_1.getAllStudents);
exports.default = studentRoute;
