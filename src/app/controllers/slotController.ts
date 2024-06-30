import { Request, Response } from "express";
import roomModel from "../model/roomModel";
import slotModel from "../model/slotModel";

export const createSlot = async (req: Request, res: Response) => {
  try {
    const { roomId, date, startTime, endTime } = req.body;

    const room = await roomModel.findById(roomId);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Room not found" });
    }

    const slot = new slotModel({ room: roomId, date, startTime, endTime });
    await slot.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Slot created successfully",
      data: slot,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server Error" });
  }
};

export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { date, roomId } = req.query;

    const query: any = { isBooked: false };
    if (date) query.date = date;
    if (roomId) query.room = roomId;

    const slots = await slotModel.find(query).populate("room");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Available slots retrieved successfully",
      data: slots,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server Error" });
  }
};
