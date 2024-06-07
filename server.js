import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 8000;

//connect MongoDB
import { connectMongoDB } from "./src/config/dbConfig.js";
connectMongoDB();

//use body parser
app.use(express.json());

//user cors
app.use(cors());

//use morgan only for production
if (process.env.NODE_ENV !== "production") {
  //you cam leave this for the prod as well to tract the user requests
  app.use(morgan("dev"));
}

//server is running healthy
app.use("/", (req, res) => {
  res.json({ message: "Server running healthy" });
});

//listen to the port
app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${port}`);
});
