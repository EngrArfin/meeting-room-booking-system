import express from "express";
import { auth, admin } from "../middleware/authMiddleware";
import {
  createBooking,
  getAllBookings,
} from "../controllers/bookingController";

const router = express.Router();

// User routes
router.post("/", auth, createBooking);

// Admin routes
router.get("/", auth, admin, getAllBookings);

export default router;
