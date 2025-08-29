import express from "express";
import {
  createStudent,
  getAllStudents,
  getOneStudent,
  getStudentByDepartments,
  updateProjectStatus,
} from "../controller/studentController";

const studentRoute = express.Router();

studentRoute.post("/create-student", createStudent);
studentRoute.get("/department/:departmentId", getStudentByDepartments);
studentRoute.get("/one-student/:id", getOneStudent);
studentRoute.get("/all-student", getAllStudents);
studentRoute.put("/update-status/:id", updateProjectStatus);

export default studentRoute;
