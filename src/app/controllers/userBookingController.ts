import { Request, Response } from "express";
import UserBookingModel from "../model/userBooking";

// Controller to get all user bookings
export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userBookings = await UserBookingModel.find();
    res.status(200).json(userBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user bookings" });
  }
};

// Controller to create a user booking
export const createUserBooking = async (req: Request, res: Response) => {
  const { id, date, totalAmount, status, rooms } = req.body;

  const newUserBooking = new UserBookingModel({
    id,
    date,
    totalAmount,
    status,
    rooms,
  });

  try {
    const savedUserBooking = await newUserBooking.save();
    res.status(201).json(savedUserBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user booking" });
  }
};
