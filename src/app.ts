import express, { Application, Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import roomRoutes from "./routes/roomRoutes";
import slotRoutes from "./routes/slotRoutes";
import bookingRoutes from "./routes/bookingRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;

//-------------------//
/* const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
}); */
