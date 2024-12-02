import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel, { IUserModel } from "../model/userModel";

// Extend the Request interface to include a `user` property
declare module "express-serve-static-core" {
  interface Request {
    user?: IUserModel;
  }
}

// Authentication middleware
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract token from Authorization header or cookies
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. No token provided.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    // Find the user in the database using the decoded token data (typically user ID)
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. User not found.",
      });
    }

    // Attach the user object to the request for further use
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid token. Authentication failed.",
    });
  }
};

// Admin middleware
export const admin = (req: Request, res: Response, next: NextFunction) => {
  // Check if the user is authenticated and has the role of 'admin'
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
  next();
};
