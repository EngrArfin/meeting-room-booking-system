import { Request, Response } from "express";
import roomModel from "../model/roomModel";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, roomNo, floorNo, capacity, pricePerSlot, amenities } =
      req.body;
    const room = new roomModel({
      name,
      roomNo,
      floorNo,
      capacity,
      pricePerSlot,
      amenities,
    });
    await room.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room added successfully",
      data: room,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server Error" });
  }
};

export const getRoom = async (req: Request, res: Response) => {
  try {
    const room = await roomModel.findById(req.params.id);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Room not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room retrieved successfully",
      data: room,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server Error" });
  }
};

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await roomModel.find({ isDeleted: false });
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Rooms retrieved successfully",
      data: rooms,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server Error" });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const room = await roomModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!room) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Room not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room updated successfully",
      data: room,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server Error" });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const room = await roomModel.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    if (!room) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Room not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server Error" });
  }
};
