import { getSession } from "../model/session/SessionModel";
import { getAStudent } from "../model/student/studentModel";
import { getATeacher } from "../model/teacher/teacherModel";
import { verifyAccessJWT } from "../utils/jwt";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let message = "";
    if (authorization) {
      const decoded = await verifyAccessJWT(authorization);
      if (decoded === "jwt expired") message = "jwt expired";

      if (decoded?.email) {
        const session = await getSession({
          token: authorization,
          associate: decoded.email,
        });

        if (session && session._id) {
          //get the user
          let user;
          const teacher = await getATeacher({ email: decoded.email });
          const student = await getAStudent({ email: decoded.email });
          user = teacher || student;

          // check if the user exists and is active
          if (user?._id && user?.status === "active") {
            user.password = undefined;
            user.__v = undefined;
            req.userInfo = user;
            return next();
          }
          if (user?.status === "inactive") {
            message = "Your account is not active. Please contact admin";
          }
        }
      }
    }
    const statusCode = message === "jwt expired" ? 403 : 401;
    res.status(statusCode).json({
      status: "error",
      message: message || "unauthorized",
    });
  } catch (error) {
    next(error);
  }
};
