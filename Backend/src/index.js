import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import rootRouter from "./routes/index.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB().then(() => {
  app.on("error", (err) => {
    console.log(`Error in connecting to db ${err}`);
    throw err;
  });

  app.use("/api/v1", rootRouter);

  app.get("/", (req, res) => {
    return res.send({ message: "Welcome to the backend of the app" });
  });

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
