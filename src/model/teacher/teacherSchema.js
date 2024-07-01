import mongoose from "mongoose";

const teacherSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    role: {
      type: String,
      default: "teacher",
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshJWT: {
      type: String,
      default: "",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model = mongoose.model("Teacher", teacherSchema);
