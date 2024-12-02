import express from "express";
import {
  createUserBooking,
  getUserBookings,
} from "../controllers/userBookingController";

const router = express.Router();

// Route to get all user bookings
router.get("/", getUserBookings);

// Route to create a user booking
router.post("/", createUserBooking);

export default router;
