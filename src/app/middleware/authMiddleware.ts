/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization denied" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Token is invalid" });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  next();
};
