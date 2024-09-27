import express from "express";
import { login, signup, adminLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter.post("/admin", adminLogin);

export default userRouter;
