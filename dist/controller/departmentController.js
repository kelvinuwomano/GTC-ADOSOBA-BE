"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartments = exports.createDepartment = void 0;
const departmentModel_1 = __importDefault(require("../model/departmentModel"));
const createDepartment = async (req, res) => {
    try {
        const { departmentName, departmentCode, description } = req.body;
        if (!departmentName || !departmentCode || !description) {
            return res.status(400).json({ message: "All fields required" });
        }
        const department = await departmentModel_1.default.findOne({ departmentName });
        if (department) {
            return res.status(400).json({ message: "Department already exists" });
        }
        const newDepartment = await departmentModel_1.default.create({
            departmentName,
            departmentCode,
            description,
        });
        res.status(201).json({ message: "Department Created", newDepartment });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "An error occurred ", error: error.message });
    }
};
exports.createDepartment = createDepartment;
const getDepartments = async (req, res) => {
    try {
        const departments = await departmentModel_1.default.find().sort({ departmentName: 1 });
        return res.status(200).json({ message: "All Departments", departments });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
};
exports.getDepartments = getDepartments;
