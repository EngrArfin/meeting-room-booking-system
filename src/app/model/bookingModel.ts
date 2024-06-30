import mongoose, { Document, Schema } from "mongoose";
import { IUserModel } from "./userModel";
import { ISlotModel } from "./slotModel";
import { IRoomModel } from "./roomModel";

export interface IBookingModel extends Document {
  room: IRoomModel["_id"];
  slots: ISlotModel["_id"][];
  user: IUserModel["_id"];
  date: string;
  totalAmount: number;
  isConfirmed: "unconfirmed" | "confirmed" | "canceled";
  isDeleted: boolean;
}

const BookingModelSchema: Schema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot", required: true }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  isConfirmed: {
    type: String,
    enum: ["unconfirmed", "confirmed", "canceled"],
    default: "unconfirmed",
  },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model<IBookingModel>("Booking", BookingModelSchema);
