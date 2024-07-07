import teacherRouter from "./teacherRouter.js";
import studentRouter from "./studentRouter.js";

export default [
  {
    path: "/api/v1/teachers",
    middlewares: [teacherRouter],
  },
  {
    path: "/api/v1/students",
    middlewares: [studentRouter],
  },
];
