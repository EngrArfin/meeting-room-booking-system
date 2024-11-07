import express from "express";
import { auth, admin } from "../middleware/authMiddleware";
import {
  createBooking,
  getAllBookings,
} from "../controllers/bookingController";

const router = express.Router();

router.post("/", auth, createBooking); // POST to create a booking
router.get("/", auth, admin, getAllBookings); // GET to retrieve all bookings

export default router;
