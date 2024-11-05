import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:5000/meeting-room-booking";

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Meeting Room server port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Meeting Room mongoDB connect error:", error);
  });
