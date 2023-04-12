import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Number, required: true, default: 1 },
  lastLogin: { type: Date, required: true, default: Date.now() },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date, required: true, default: Date.now() },
});

interface User extends mongoose.Document {
  email: string;
  password: string;
}

export default mongoose.model<User>("User", UserSchema);
