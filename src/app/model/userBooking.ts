import mongoose, { Document, Schema } from "mongoose";

// Define the structure for room details
interface Room {
  name: string;
  date: string;
  time: string;
  duration: string;
}

// Define the structure for the user booking
interface UserBooking extends Document {
  id: string;
  date: string;
  totalAmount: number;
  status: string;
  rooms: Room[];
}

const roomSchema = new Schema<Room>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: String, required: true },
});

const userBookingSchema = new Schema<UserBooking>({
  id: { type: String, required: true },
  date: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true },
  rooms: { type: [roomSchema], required: true },
});

const userBookingModel = mongoose.model<UserBooking>(
  "UserBooking",
  userBookingSchema
);

export default userBookingModel;
