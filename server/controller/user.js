import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPAssword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPAssword,
    });

    return res.status(200).json({
      message: "Accout created successfully",
      success: true,
    });
  } catch (error) {
    console.error("error", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "emails and password is incorrect",
        success: false,
      });
    }

    const isPasswrodMatch = await bcrypt.compare(password, user.password);
    if (!isPasswrodMatch) {
      return res.status(400).json({
        message: "emails and password is incorrect",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome back ${user.fullName}`,
      });
  } catch (error) {
    console.error("error", error);
  }
};

export const logout = async (_,res) => {
  try {
    return res.status(200).cookie("token", "", {maxAge:0}).json({
      success: true,
      message: "User logout successfully."
    })
  } catch (error) {
    
  }
}