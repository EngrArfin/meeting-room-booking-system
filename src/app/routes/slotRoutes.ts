/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import roomModel from "../model/roomModel";
import { admin, auth } from "../middleware/authMiddleware";
import slotModel from "../model/slotModel";

const router = express.Router();

router.post("/", auth, admin, async (req, res) => {
  try {
    const { room, date, startTime, endTime } = req.body;

    const existingRoom = await roomModel.findById(room);
    if (!existingRoom) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Room not found",
      });
    }

    const slot = new slotModel({ room, date, startTime, endTime });
    await slot.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Slot created successfully",
      data: slot,
    });
  } catch (error: any) {
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

    const availableSlots = await slotModel
      .find({
        room,
        date,
        isBooked: false,
      })
      .populate("room");

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Available slots retrieved successfully",
      data: availableSlots,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
});

export default router;
