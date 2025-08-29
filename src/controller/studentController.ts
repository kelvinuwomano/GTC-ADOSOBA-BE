import { Request, Response } from "express";
import Project from "../model/projectModel";
import Student from "../model/studentModel";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const {
      studentID,
      firstName,
      lastName,
      email,
      phoneNumber,
      enrollmentDate,
      department,
      project,
      closureDate,
      session,
    } = req.body;
    if (
      !studentID ||
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !enrollmentDate ||
      !department ||
      !closureDate ||
      !session
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    let projectsIds: string[] = [];
    if (project && Array.isArray(project)) {
      const createProjects = await Project.insertMany(project);
      projectsIds = createProjects.map((p) => p._id.toString());
    }
    const newStudent = new Student({
      studentID,
      firstName,
      lastName,
      email,
      phoneNumber,
      enrollmentDate,
      department,
      session,
      closureDate,
      project: projectsIds,
    });
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "Student created", savedStudent });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

export const getStudentByDepartments = async (req: Request, res: Response) => {
  try {
    const { departmentId } = req.params;
    const student = await Student.find({ department: departmentId })
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
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export const getOneStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id)
      .populate("department")
      .populate("project");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student details", student });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const allStudents = await Student.find()
      .lean()
      .populate("department")
      .populate("project");
    res.status(200).json({ message: "All Students", allStudents });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export const updateProjectStatus = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {status} = req.body;
    const getProject = await Project.findByIdAndUpdate(id, {status}, {new: true})
    if (!getProject) {
      return res.status(400).json({ message: "Project not found"})
    }
    res.status(200).json({message: "Status updated successfully", getProject})
  } catch (error: any) {
    res.status(500).json({message: "An error occurred", error: error.message})
  }
}