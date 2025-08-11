import mongoose, { Schema } from "mongoose";

interface IDepartment extends Document {
  departmentName: string;
  departmentCode: string;
  description: string;
}

const departmentSchema = new Schema<IDepartment>({
  departmentName: {
    type: String,
    required: true,
  },
  departmentCode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model<IDepartment>("Department", departmentSchema);
export default Department;
