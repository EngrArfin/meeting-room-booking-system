import { Request, Response } from "express";
import bookingModel from "../model/bookingModel";
import roomModel from "../model/roomModel";
import slotModel from "../model/slotModel";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { roomId, slotIds, date } = req.body;

    // Ensure the user is authenticated
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated." });
    }

    // Validate input fields
    if (!roomId || !Array.isArray(slotIds) || !slotIds.length || !date) {
      return res.status(400).json({
        success: false,
        message: "Room ID, Slot IDs, and Date are required fields.",
      });
    }

    // Validate date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Please provide a valid date.",
      });
    }

    // Check room existence
    const room = await roomModel.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    // Check slot availability
    const slots = await slotModel.find({
      _id: { $in: slotIds },
      isBooked: false,
    });
    if (slots.length !== slotIds.length) {
      return res.status(400).json({
        success: false,
        message: "Some slots are already booked or invalid.",
      });
    }

    // Calculate total amount
    const totalAmount = slots.length * room.pricePerSlot;

    // Create booking
    const booking = await bookingModel.create({
      room: roomId,
      slots: slotIds,
      user: userId,
      date,
      totalAmount,
      isConfirmed: "unconfirmed",
    });

    // Mark slots as booked
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
