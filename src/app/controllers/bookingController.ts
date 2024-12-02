import { Request, Response } from "express";
import bookingModel from "../model/bookingModel";
import roomModel from "../model/roomModel";
import slotModel from "../model/slotModel";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { roomId, slotIds, date } = req.body;
    const userId = req.user?._id;

    // Check if userId is missing
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is missing" });
    }

    // Validate input fields
    if (
      !roomId ||
      !slotIds ||
      !Array.isArray(slotIds) ||
      !slotIds.length ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message: "Room ID, Slot IDs (array), and Date are required fields.",
      });
    }

    // Validate date format
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Please provide a valid date.",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated. Please log in.",
      });
    }

    const room = await roomModel.findById(roomId);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found." });
    }

    const slots = await slotModel.find({
      _id: { $in: slotIds },
      isBooked: false,
    });

    if (slots.length !== slotIds.length) {
      return res.status(400).json({
        success: false,
        message: "Some slots are not available or invalid.",
      });
    }

    const totalAmount = slots.length * room.pricePerSlot;

    const booking = new bookingModel({
      room: roomId,
      slots: slotIds,
      user: userId,
      date,
      totalAmount,
      isConfirmed: "unconfirmed",
    });

    await booking.save();
    await slotModel.updateMany({ _id: { $in: slotIds } }, { isBooked: true });

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: booking,
    });
  } catch (error) {
    console.error("Error in createBooking:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    // Fetch all bookings with populated room, slots, and user details
    const bookings = await bookingModel
      .find()
      .populate("room")
      .populate("slots")
      .populate("user");

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error in getAllBookings:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
};
