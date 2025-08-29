import { Request, Response } from "express";
import Department from "../model/departmentModel";
import Student, { IStudent } from "../model/studentModel";
import Project from "../model/projectModel";

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { departmentName, departmentCode, description } = req.body;
    if (!departmentName || !departmentCode || !description) {
      return res.status(400).json({ message: "All fields required" });
    }
    const department = await Department.findOne({ departmentName });
    if (department) {
      return res.status(400).json({ message: "Department already exists" });
    }
    const newDepartment = await Department.create({
      departmentName,
      departmentCode,
      description,
    });
    res.status(201).json({ message: "Department Created", newDepartment });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "An error occurred ", error: error.message });
  }
};

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await Department.find().sort({ departmentName: 1 }).populate("");
    return res.status(200).json({ message: "All Departments", departments });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};


export const getDepartmentStats = async (req: Request, res: Response) => {
  try {
    const { departmentId } = req.params;
    const studentCount = await Student.countDocuments({ department: departmentId });
    const projectCount = await Project.countDocuments({ department: departmentId });

    res.status(200).json({ studentCount, projectCount });
  } catch (err: any) {
    res.status(500).json({ message: "Error fetching department stats", error: err.message });
  }
};

