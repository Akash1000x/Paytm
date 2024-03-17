import express from "express";
import { z } from "zod";
import JWT from "jsonwebtoken";
import User from "../../models/user.model.js";
import authMiddleware from "../../middleware/auth.middleware.js";
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
      .json({ message: "Email already taken or Incorrect inputs" });
  }

  const userExist = await User.findOne({ username: req.body.username });
  if (userExist)
    return res
      .status(411)
      .json({ message: "Email already taken or Incorrect inputs" });

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

  return res.status(200).json({ message: "User created successfully", token: token });
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
  
  if (user) {
    const user_id = user._id;
    const token = JWT.sign({ user_id }, `${process.env.SECRET}`);
    return res.send({ message: "User signed in successfully", token: token,name:user.firstName });
  }

  res.status(411).json({
    message: "username or password is incorrect",
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

router.get("/bulk",authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  let users = await User.find({
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

  users = users.filter((user)=> user._id != req.user_id)
  return res.status(200).json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id:user._id
    })),
  });
});



export default router;
