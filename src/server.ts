import express, { Express , Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import database from "./database/db";
import userRoute from "./routes/userRoutes";
import departmentRoute from "./routes/departmentRoute";
import studentRoute from "./routes/studentRoute";

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
database();
const port = process.env.PORT || 5000;


app.use("/api/user", userRoute);
app.use("/api/department", departmentRoute);
app.use("/api/student", studentRoute);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to our server" });
});
app.listen(port, () => {
  console.log(new Date().toLocaleString(), port);
});
