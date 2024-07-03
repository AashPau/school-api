import express from "express";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { insertStudent } from "../model/student/studentModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, (req, res, next) => {
  try {
    const { userInfo } = req;
    userInfo?.refreshJWT = undefined;

    userInfo?.status === "active"?res.json({
      status:"success",
      message:"",
      userInfo,
    }):res.json({
      stauts:"error",
      message:"your account had not been activated please contact admin."
    })
  } catch (error) {
    next(error);
  }
});

export default router;
