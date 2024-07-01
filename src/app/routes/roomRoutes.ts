import express from "express";
import { admin, auth } from "../middleware/authMiddleware";
import roomModel from "../model/roomModel";

const router = express.Router();

router.post("/", auth, admin, async (req, res) => {
  try {
    const room = new roomModel(req.body);
    await room.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room added successfully",
      data: room,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await roomModel.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room retrieved successfully",
      data: room,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const rooms = await roomModel.find({ isDeleted: false });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Rooms retrieved successfully",
      data: rooms,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
});

router.put("/:id", auth, admin, async (req, res) => {
  try {
    const room = await roomModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room updated successfully",
      data: room,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
});

router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const room = await roomModel.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room deleted successfully",
      data: room,
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
