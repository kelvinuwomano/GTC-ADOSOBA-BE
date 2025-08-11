import mongoose, { Document, Schema } from "mongoose";

interface IStudent extends Document {
  studentID: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  enrollmentDate: Date;
  department: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId[];
}

const studentSchema = new Schema<IStudent>(
  {
    studentID: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    enrollmentDate: {
      type: Date,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    project: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model<IStudent>("Student", studentSchema);
export default Student;
