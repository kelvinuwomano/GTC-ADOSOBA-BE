import express from "express";
import { login, signUp } from "../controller/userController";


const userRoute = express.Router();
userRoute.post("/signup", signUp)
userRoute.post("/login", login)



export default userRoute;