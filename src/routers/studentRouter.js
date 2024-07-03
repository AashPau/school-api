import express from "express";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { insertStudent } from "../model/student/studentModel.js";
import { hashPassword } from "../utils/bcrypt.js";

const router = express.Router();

router.get("/", auth, (req, res, next)=>{
  try {
    const {userInfo}
  } catch (error) {
    next(error)
  }
})

export default router;
