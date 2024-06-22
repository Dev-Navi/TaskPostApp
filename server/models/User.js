import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/config";

const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      default: "",
    },
    UserRole: {
      type: String,
      default: "Customer",
      enum: ["Customer", "Admin"],
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateToken = async (payload) => {
  let token = await jwt.sign(payload, config.secrateKey);
  return `Bearer ${token}`;
};

const UserModel = mongoose.model("users", UserSchema, "users");
export default UserModel;
