import jwt from "jsonwebtoken";
import { insertSession } from "../models/session/SessionModel.js";
import { updateTeacher } from "../model/teacher/teacherModel.js";
import { updateStudent } from "../model/student/studentModel.js";

export const signAccessJWT = async (email) => {
  const token = jwt.sign({ email }, process.env.ACCESSJWT_SECRET, {
    expiresIn: "1m",
  });

  const session = await insertSession({ token, associate: email });
  return session._id ? token : null;
};

export const verifyAccessJWT = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESSJWT_SECRET);
    return decoded;
  } catch (error) {
    return error.message;
  }
};

// =====
//to update student model
export const signRefreshJWTStudent = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.REFRESHJWT_SECRET, {
    expiresIn: "30d",
  });

  const user = await updateStudent({ email }, { refreshJWT });

  return user._id ? refreshJWT : null;
};

//to update teacher model
export const signRefreshJWTTeacher = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.REFRESHJWT_SECRET, {
    expiresIn: "30d",
  });

  const user = await updateTeacher({ email }, { refreshJWT });

  return user._id ? refreshJWT : null;
};

//verify the jwt
export const verifyRefreshJWT = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESHJWT_SECRET);
  } catch (error) {
    return error.message;
  }
};

//get the tokens
export const getTokens = async (email) => {
  return {
    accessJWT: await signAccessJWT(email),
    refreshJWT: await signRefreshJWT(email),
  };
};
