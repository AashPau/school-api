import express from "express";

import { getAStudent, updateStudent } from "../model/student/studentModel.js";
import { comparePassword } from "../utils/bcrypt.js";
import { auth } from "../middlewares/auth.js";
import { getTokens, signAccessJWT } from "../utils/jwt.js";
import { deleteManySession } from "../model/session/SessionModel.js";

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

// login

router.post("/login", async (req, res, next) => {
  try {
    let message = "";
    const { email, password } = req.body;
    // 1. cheich if user exist with email
    const user = await getAStudent({ email });

    if (user?._id && user?.status === "active") {
      //verify passwords

      const confirmPass = comparePassword(password, user.password);

      if (confirmPass) {
        //useris now authenticated

        // create jwts then return

        return res.json({
          status: "success",
          message: "Login Successfull",
          jwts: await getTokens(email),
        });
      }
    }

    if (user?.status === "inactive") {
      message = "Your account is not active, contact admin";
    }

    if (!user?.isEmailVerified) {
      message = "User not verified, please check your email and verify";
    }

    res.json({
      status: "error",
      message: message || "Invalid login details",
    });
  } catch (error) {
    next(error);
  }
});
// return new accessJWT
router.get("/new-accessjwt", async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // verify jwt

    const decode = verifyRefreshJWT(authorization);
    console.log(decode, "--------");
    if (decode?.email) {
      // check if exist in the user table,
      const user = await getAStudent({
        email: decode.email,
        refreshJWT: authorization,
      });

      if (user?._id) {
        // create new accessJWT and return

        const accessJWT = await signAccessJWT(decode.email);

        if (accessJWT) {
          return res.json({
            status: "success",
            message: "",
            accessJWT,
          });
        }
      }
    }

    res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  } catch (error) {
    next(error);
  }
});

// Logout student
router.delete("/logout", auth, async (req, res, next) => {
  try {
    const { email } = req.userInfo;

    await updateStudent({ email }, { refreshJWT: "" });
    // verify jwt
    await deleteManySession({ associate: email });

    res.json({
      status: "success",
      message: "you are loggedout",
    });
  } catch (error) {
    next(error);
  }
});



export default router;
