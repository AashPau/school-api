import teacherRouter from "./teacherRouter.js";
import studentRouter from "./studentRouter.js";
import parentRouter from "./parentRouter.js";

export default [
  {
    path: "/api/v1/teachers",
    middlewares: [teacherRouter],
  },
  {
    path: "/api/v1/students",
    middlewares: [studentRouter],
  },
  {
    path: "/api/v1/parents",
    middlewares: [parentRouter],
  },
];
