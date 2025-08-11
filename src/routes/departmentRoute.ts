import express from "express";
import { createDepartment, getDepartments } from "../controller/departmentController";

const departmentRoute = express.Router();
departmentRoute.post("/create-department", createDepartment);
departmentRoute.get("/all-departments", getDepartments)

export default departmentRoute;
