import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    student_id: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    isCertificateIssued: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("student", studentSchema);

export default Student;