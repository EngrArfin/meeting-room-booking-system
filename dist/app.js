"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
/* import authRoutes from "./routes/authRoutes";
import roomRoutes from "./routes/roomRoutes";
import slotRoutes from "./routes/slotRoutes";
import bookingRoutes from "./routes/bookingRoutes"; */
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/rooms", roomRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
});
exports.default = app;
//-------------------//
/* const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
}); */
