"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../model/userModel"));
const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: "All fields required" });
            return;
        }
        const checkEmail = await userModel_1.default.findOne({ email });
        if (checkEmail) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User Created", newUser });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
};
exports.signUp = signUp;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }
        const checkEmail = await userModel_1.default.findOne({ email });
        if (!checkEmail) {
            return res.status(400).json({ message: "User not found please signup" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, checkEmail.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        res.status(200).json({ message: "Login Successful", checkEmail });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
};
exports.login = login;
