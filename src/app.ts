/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./app/routes/authRoutes";
import roomRoutes from "./app/routes/roomRoutes";
import slotRoutes from "./app/routes/slotRoutes";
import bookingRoutes from "./app/routes/bookingRoutes";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Meeting room project");
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;
