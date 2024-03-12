import express from "express";
import { z } from "zod";
import JWT from "jsonwebtoken";
import User from "../../models/user.model.js";
import authMiddleware from "../../middleware/middleware.js";
import Account from "../../models/accounts.model.js";

const router = express.Router();

const userSignupSchema = z.object({
  username: z.string().email(),
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  password: z.string().min(8).max(20),
});

const userSigninSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8).max(20),
});

const userUpdateSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
  password: z.string().min(8).max(20).optional(),
});


router.post("/signup", async (req, res) => {
  const userData = req.body;
  const { success } = userSignupSchema.safeParse(userData);

  if (!success) {
    return res
      .status(411)
      .json({ message: "Email already taken / Incorrect inputs" });
  }

  const userExist = await User.findOne({ username: req.body.username });
  if (userExist)
    return res
      .status(411)
      .json({ message: "Email already taken / Incorrect inputs" });

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const user_id = user._id;
  await Account.create({
    userId: user_id,
    balance: Math.floor((Math.random() + 1) * 10000),
  });

  const token = JWT.sign({ user_id }, `${process.env.SECRET}`);

  return res.send({ message: "User created successfully", token: token });
});

router.post("/signin", async (req, res) => {
  const { success } = userSigninSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: " Incorrect inputs" });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  const user_id = user._id;

  if (user) {
    const token = JWT.sign({ user_id }, `${process.env.SECRET}`);
    return res.send({ message: "User signed in successfully", token: token });
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = userUpdateSchema.safeParse(req.body);
  if (!success)
    return res
      .status(411)
      .json({ message: "Error while updating information" });

  try {
    await User.updateOne({ _id: req.user_id }, req.body);
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res
      .status(411)
      .json({ message: "Error while updating information" });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  return res.status(200).json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    })),
  });
});



export default router;
