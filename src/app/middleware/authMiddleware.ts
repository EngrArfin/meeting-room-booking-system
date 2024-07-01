import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "No token, authorization denied",
      });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "User not found",
      });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Token is not valid",
    });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user.role !== "admin") {
    return res.status(403).json({
      success: false,
      statusCode: 403,
      message: "Access denied",
    });
  }
  next();
};
