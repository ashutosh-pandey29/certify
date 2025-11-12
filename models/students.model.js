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
    internship_domain: {
      type: String,
      required: true,
      trim: true,
    },
    start_date: {
      type: Date,
      required: true,
      trim: true,
    },
    end_date: {
      type: Date,
      required: true,
      trim: true,
    },
    certificate_id: {
      type: String,
      trim: true,
      default:null,
    },
    certificate_file_path: {
      type: String,
      trim: true,
      default:null,
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
