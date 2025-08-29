import { Request, Response } from "express";
import Department from "../model/departmentModel";
import Student, { IStudent } from "../model/studentModel";

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

    // Find department
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Count students in this department
    const studentCount = await Student.countDocuments({ department: departmentId });

    // Get unique project IDs from students
    const students = await Student.find({ department: departmentId }).populate("project");
    const projectSet = new Set<string>();
    students.forEach((s: IStudent) => {
      s.project.forEach((p: any) => projectSet.add(p._id.toString()));
    });

    res.status(200).json({
      department,
      studentCount,
      projectCount: projectSet.size,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching department stats", error: error.message });
  }
};

