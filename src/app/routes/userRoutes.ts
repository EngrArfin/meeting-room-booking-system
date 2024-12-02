/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response, NextFunction } from "express";
import { auth } from "../middleware/authMiddleware";
import userModel from "../model/userModel";

const router = express.Router();
router.get(
  "/",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userModel.find().select("-password");
      res.status(200).json({
        success: true,
        statusCode: 200,
        data: users,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
