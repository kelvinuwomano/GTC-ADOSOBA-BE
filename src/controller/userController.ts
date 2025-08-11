import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../model/userModel";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields required" });
      return;
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User Created", newUser });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      return res.status(400).json({ message: "User not found please signup" });
    }
    const isMatch = await bcrypt.compare(password, checkEmail.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    res.status(200).json({ message: "Login Successful", checkEmail });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
