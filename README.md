## meeting-room-booking-system

The server for the Meeting Room Booking System is responsible for managing the backend logic, data storage, and communication between the client-side application and the database. The server is built using Node.js with Express as the framework to handle HTTP requests and define API endpoints for various operations related to meeting room bookings.

## Tech Stack

**Server:** TypeScript, Node, Express, MongoDB, Mongoose, Zod.

## Deployment Install Step By Step

```bash
  mkdir meeting-room-booking-system
```

cd meeting-room-booking-system

```bash
  npm init -y
```

```bash
  npm i express cors dotenv mongodb
```

code .

# Basic Setup

copy past in

# server.ts

```bash
  const express = require('express');
	const app = express();
	const cors = require('cors');
	const port = process.env.PORT || 5000;

	//middleware
	app.use(cors());
	app.use(express.json());

	app.get('/', (req, res)=>{
	    req.send('attendance is sitting')
	})
	app.listen(port, () => {
	    console.log(`Attendence is setting on the port ${port}`)
	})

```

# app.ts

```bash
  import express, { Application, Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./app/routes/authRoutes";
import roomRoutes from "./app/routes/roomRoutes";
import slotRoutes from "./app/routes/slotRoutes";
import bookingRoutes from "./app/routes/bookingRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my Meeting room booking system project");
});
// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;


```

# config index.ts

```bash
  import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
```

```bash
  nodemon index.js
```

Project Name: meeting-room-booking-system

cd mmeeting-room-booking-system

## Run Project

![App Screenshot](c:\Users\DELL\Pictures\Screenshots\basic project.png)

# next some installation

```bash
  npm install jsonwebtoken
```

```bash
  npm install axios
```

#Project Basic Setup

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## If You want project clone and Run Locally

Server Clone the project

```bash
  git https://github.com/EngrArfin/meeting-room-booking-system.git
```

Go to the project directory

```bash
  cd meeting-room-booking-system
```

Install dependencies

```bash
  node -v
npm -v

```

# install

```bash
  npm install
```

# Create a .env file in the root directory of the project.

```bash
  PORT=3000
DB_CONNECTION_STRING=your_database_connection_string
JWT_SECRET=your_jwt_secret_key

```

# Set Up the Database

Ensure you have the appropriate database software installed (e.g., MongoDB, MySQL).
