/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { admin, auth } from "../middleware/authMiddleware";
import roomModel from "../model/roomModel";

const router = express.Router();

const successResponse = (
  res: any,
  message: string,
  data: any,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

const errorResponse = (res: any, message: string, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

router.post("/", auth, admin, async (req, res) => {
  console.log("Auth and Admin passed, entering POST /rooms");

  console.log("Request Body:", req.body);

  const { name, roomNo, floorNo, capacity, pricePerSlot, amenities } = req.body;

  if (
    !name ||
    !roomNo ||
    !floorNo ||
    !capacity ||
    !pricePerSlot ||
    !amenities
  ) {
    return errorResponse(res, "All fields are required", 400);
  }

  try {
    const room = new roomModel(req.body);

    await room.save();

    console.log("Room created:", room);
    successResponse(res, "Room added successfully", room);
  } catch (error: any) {
    console.error("Error in POST /rooms:", error.message);
    if (error.code === 11000) {
      return errorResponse(res, "Room number must be unique", 400);
    }
    errorResponse(res, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await roomModel.findById(req.params.id);

    if (!room) {
      return errorResponse(res, "Room not found", 404);
    }

    successResponse(res, "Room retrieved successfully", room);
  } catch (error: any) {
    errorResponse(res, error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const rooms = await roomModel.find();
    successResponse(res, "Rooms retrieved successfully", rooms);
  } catch (error: any) {
    errorResponse(res, error.message);
  }
});

router.put("/:id", auth, admin, async (req, res) => {
  try {
    const room = await roomModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!room) {
      return errorResponse(res, "Room not found", 404);
    }

    successResponse(res, "Room updated successfully", room);
  } catch (error: any) {
    errorResponse(res, error.message);
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
      return errorResponse(res, "Room not found", 404);
    }

    successResponse(res, "Room deleted successfully", room);
  } catch (error: any) {
    errorResponse(res, error.message);
  }
});

export default router;
