/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./app/routes/userRoutes";
import authRoutes from "./app/routes/authRoutes";
import roomRoutes from "./app/routes/roomRoutes";
import slotRoutes from "./app/routes/slotRoutes";
import bookingRoutes from "./app/routes/bookingRoutes";
import userBookingRoutes from "./app/routes/userBookingRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/userBookings", userBookingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Meeting Room Project API!");
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;
