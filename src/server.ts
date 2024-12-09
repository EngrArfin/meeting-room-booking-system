import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app"; // Import the Express app

// Load environment variables
dotenv.config();

// Define the port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Define the MongoDB connection URL (fallback to a local DB if not set)
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:5000/meeting-room-booking"; // Local fallback for development

// MongoDB connection
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("MongoDB connected");
    // Start the Express server once the DB connection is successful
    app.listen(PORT, () => {
      console.log(`Meeting Room server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
