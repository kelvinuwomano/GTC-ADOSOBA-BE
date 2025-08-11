"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStudents = exports.getOneStudent = exports.getStudentByDepartments = exports.createStudent = void 0;
const projectModel_1 = __importDefault(require("../model/projectModel"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const createStudent = async (req, res) => {
    try {
        const { studentID, firstName, lastName, email, phoneNumber, enrollmentDate, department, projects, } = req.body;
        if (!studentID ||
            !firstName ||
            !lastName ||
            !email ||
            !phoneNumber ||
            !enrollmentDate ||
            !department) {
            return res.status(400).json({ message: "All fields required" });
        }
        let projectsIds = [];
        if (projects && Array.isArray(projects)) {
            const createProjects = await projectModel_1.default.insertMany(projects);
            projectsIds = createProjects.map((p) => p._id.toString());
        }
        const newStudent = new studentModel_1.default({
            studentID,
            firstName,
            lastName,
            email,
            phoneNumber,
            enrollmentDate,
            department,
            project: projectsIds,
        });
        const savedStudent = await newStudent.save();
        res.status(201).json({ message: "Student created", savedStudent });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
};
exports.createStudent = createStudent;
const getStudentByDepartments = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const student = await studentModel_1.default.find({ department: departmentId })
            .populate("department")
            .populate("project");
        if (student.length === 0) {
            return res
                .status(400)
                .json({ message: "No Student found in this department" });
        }
        res
            .status(200)
            .json({ message: "List of students in this department", student });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
};
exports.getStudentByDepartments = getStudentByDepartments;
const getOneStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await studentModel_1.default.findById(id)
            .populate("department")
            .populate("project");
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student details", student });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
};
exports.getOneStudent = getOneStudent;
const getAllStudents = async (req, res) => {
    try {
        const allStudents = await studentModel_1.default.find()
            .lean()
            .populate("department")
            .populate("project");
        res.status(200).json({ message: "All Students", allStudents });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
};
exports.getAllStudents = getAllStudents;
