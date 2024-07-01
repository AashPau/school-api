import express from "express";
import { newUserValidation } from "../middlewares/joiValidation";

const router = express.Router();

router.post("/", newUserValidation, async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
