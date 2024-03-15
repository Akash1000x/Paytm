import express from "express";
import userRouter from "./user/index.js";
import accountRouter from "./account/index.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;
