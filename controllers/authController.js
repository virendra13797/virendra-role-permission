import { validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(200).json({
        success: false,
        msg: "This email is already exist",
      });
    }

    const hashPass = await bcrypt.hash(password, 10); // Add await here
    const user = new User({
      name,
      email,
      password: hashPass,
    });
    const UserData = await user.save();
    return res.status(200).json({
      success: true,
      msg: "Registered-Successfully",
      data: UserData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

//   User login //

const generateAccessToken = async (user) => {
  return jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: "4h",
  });
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(200).json({
        success: false,
        msg: "email and password is incorrect",
      });
    }

    const isPassMatched = await bcrypt.compare(password, userData.password);
    if (!isPassMatched) {
      return res.status(200).json({
        success: false,
        msg: "email and password is incorrect",
      });
    }
    const accessToken = await generateAccessToken({ user: userData });
    return res.status(200).json({
      success: true,
      msg: " login-Successfully ",
      data: userData,
      token: accessToken,
      tokenType: "Bearer",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

// get-profile //hello

const getProfile = async (req, res) => {
  try {
    const userData = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      msg: "User-Profile",
      data: userData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export { registerUser, loginUser, getProfile };
