/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";

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

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User registered successfully",
      data: userData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal server error: JWT_SECRET not defined",
      });
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      accessToken,
      data: userData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Server error",
    });
  }
});

export default router;
