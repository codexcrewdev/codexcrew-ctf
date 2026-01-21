import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  score: number;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
