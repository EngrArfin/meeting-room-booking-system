import express from "express";
import Slot from "../models/Slot";
import Room from "../models/Room";
import { auth, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", auth, admin, async (req, res) => {
  try {
    const { room, date, startTime, endTime } = req.body;

    const existingRoom = await Room.findById(room);
    if (!existingRoom) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Room not found",
      });
    }

    const slot = new Slot({ room, date, startTime, endTime });
    await slot.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Slot created successfully",
      data: slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
});

router.get("/availability", async (req, res) => {
  try {
    const { room, date } = req.query;

    const availableSlots = await Slot.find({
      room,
      date,
      isBooked: false,
    }).populate("room");

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Available slots retrieved successfully",
      data: availableSlots,
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
