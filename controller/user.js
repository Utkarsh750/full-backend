import { User } from "../models/user";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(403).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        message: "User already exists",
        success: false,
      });
    }
    
    await User.create({
      fullName,
      email,
      password,
    });

    return res.status(200).json({
      message: "Accout created successfully",
      success: true,
    });
  } catch (error) {
    console.error("error", error);
  }
};
