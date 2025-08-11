"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./database/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const departmentRoute_1 = __importDefault(require("./routes/departmentRoute"));
const studentRoute_1 = __importDefault(require("./routes/studentRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
(0, db_1.default)();
const port = process.env.PORT || 5000;
app.use("/api/user", userRoutes_1.default);
app.use("/api/department", departmentRoute_1.default);
app.use("/api/student", studentRoute_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to our server" });
});
app.listen(port, () => {
    console.log(new Date().toLocaleString(), port);
});
