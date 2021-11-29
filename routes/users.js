import express from "express";
import { genPassword } from "../helper.js";

const router = express.Router();

router.route("/signup").post(async (req, res) => {
  const { userName, password } = req.body;

  const hashedPassword = await genPassword(password);

  res.send({ userName: userName, password: hashedPassword });
});

export const userRouter = router;
