import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import { loginUser } from "../controllers/userController";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    });

    await user.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      token,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
});

export default router;
