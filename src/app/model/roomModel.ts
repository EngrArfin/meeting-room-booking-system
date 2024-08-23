import mongoose, { Document, Schema } from "mongoose";

export interface IRoomModel extends Document {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
}

const RoomModelSchema: Schema = new Schema({
  name: { type: String, required: true },
  roomNo: { type: Number, required: true, unique: true },
  floorNo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  pricePerSlot: { type: Number, required: true },
  amenities: { type: [String], required: true },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model<IRoomModel>("Room", RoomModelSchema);
