import mongoose, { Schema } from "mongoose";

interface IProject extends Document {
  projectName: string;
  status: string;
  grade: string;
  description: string;
}

const projectScchema = new Schema<IProject>({
  projectName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Completed", "In Progress", "Terminated", "Uncompleted"],
    required: true,
    default: "In Progress",
  },
  grade: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model<IProject>("Project", projectScchema);
export default Project;
