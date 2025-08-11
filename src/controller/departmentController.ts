import { Request, Response } from "express";
import Department from "../model/departmentModel";

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
    const departments = await Department.find().sort({ departmentName: 1 });
    return res.status(200).json({ message: "All Departments", departments });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
