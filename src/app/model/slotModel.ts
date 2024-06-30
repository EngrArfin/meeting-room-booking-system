import mongoose, { Document, Schema } from "mongoose";
import { IRoomModel } from "./roomModel";

export interface ISlotModel extends Document {
  room: IRoomModel["_id"];
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const SlotModelSchema: Schema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

export default mongoose.model<ISlotModel>("Slot", SlotModelSchema);
