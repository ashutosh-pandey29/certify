import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      types: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false, // false => user , true=>admin
    },
    
  },
  {
    timestamps: true,
  }
);
