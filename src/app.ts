/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose"; // Import mongoose for MongoDB connection

// Import routes
import userRoutes from "./app/routes/userRoutes";
import authRoutes from "./app/routes/authRoutes";
import roomRoutes from "./app/routes/roomRoutes";
import slotRoutes from "./app/routes/slotRoutes";
import bookingRoutes from "./app/routes/bookingRoutes";
import userBookingRoutes from "./app/routes/userBookingRoutes";

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "https://meeting-room-booking-systrm-client-app.vercel.app",
    credentials: true, // Allow credentials (cookies)
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/userBookings", userBookingRoutes);

// Root route (Welcome message)
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Meeting Room Project API!");
});

// MongoDB connection (without deprecated options)
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Use the port from environment or default to 5000 (this is already handled in server.ts)
const PORT = process.env.PORT || 5000;

export default app;
