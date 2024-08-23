import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import userModel from "../model/userModel";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "User already exists",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid user data",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid email or password",
    });
  }
};
