import mongoose, { Document, Schema } from "mongoose";

export interface IUSer extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUSer>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUSer>("User", userSchema);
export default User;
