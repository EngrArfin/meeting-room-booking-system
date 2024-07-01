import express from "express";
import Booking from "../models/Booking";
import Slot from "../models/Slot";
import Room from "../models/Room";
import { auth, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { room, slots, date, user } = req.body;

    const roomDetails = await Room.findById(room);
    if (!roomDetails) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Room not found",
      });
    }

    const selectedSlots = await Slot.find({
      _id: { $in: slots },
      isBooked: false,
    });
    if (selectedSlots.length !== slots.length) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "One or more slots are already booked",
      });
    }

    const totalAmount = selectedSlots.length * roomDetails.pricePerSlot;

    const booking = new Booking({
      room,
      slots,
      user,
      date,
      totalAmount,
    });

    await booking.save();
    await Slot.updateMany({ _id: { $in: slots } }, { isBooked: true });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
});

router.get("/", auth, admin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room user slots");

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
});

export default router;
