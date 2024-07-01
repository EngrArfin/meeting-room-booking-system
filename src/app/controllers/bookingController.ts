import { Request, Response } from "express";
import roomModel from "../model/roomModel";
import slotModel from "../model/slotModel";
import bookingModel from "../model/bookingModel";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { roomId, slotIds, date } = req.body;
    const userId = req.userID;

    const room = await roomModel.findById(roomId);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Room not found" });
    }

    const slots = await slotModel.find({
      _id: { $in: slotIds },
      isBooked: false,
    });
    if (slots.length !== slotIds.length) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Some slots are not available",
      });
    }

    const totalAmount = slots.length * room.pricePerSlot;

    const booking = new bookingModel({
      room: roomId,
      slots: slotIds,
      user: userId,
      date,
      totalAmount,
    });

    await booking.save();

    await slotModel.updateMany({ _id: { $in: slotIds } }, { isBooked: true });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server Error" });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingModel
      .find({ isDeleted: false })
      .populate("room slots user");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server Error" });
  }
};
