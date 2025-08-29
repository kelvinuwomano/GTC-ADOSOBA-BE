import express from "express";
import { createDepartment, getDepartments, getDepartmentStats } from "../controller/departmentController";

const departmentRoute = express.Router();
departmentRoute.post("/create-department", createDepartment);
departmentRoute.get("/all-departments", getDepartments)
departmentRoute.get("/:departmentId/stats", getDepartmentStats);


export default departmentRoute;
