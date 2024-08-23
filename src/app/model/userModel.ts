import mongoose, { Document, Schema } from "mongoose";

export interface IUserModel extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserModelSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
});

export default mongoose.model<IUserModel>("User", UserModelSchema);
