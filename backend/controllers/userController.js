import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please enter all fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.json({ success: false, message: "Failed to create user" });
    }

    const token = createToken(newUser._id);

    res.json({
      token,
      newUser,
      success: true,
      message: "User signed up successfully",
    });
  } catch (error) {
    console.log("Error while signing up user : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Please enter all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const token = createToken(user._id);

    res.json({
      token,
      user,
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("Error while logging in user : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Please enter all fields" });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(email + password, process.env.JWT_SECRET);

    res.json({
      token,
      success: true,
      message: "Admin logged in successfully",
    });
  } catch (error) {
    console.log("Error while logging in admin : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

export { signup, login, adminLogin };
