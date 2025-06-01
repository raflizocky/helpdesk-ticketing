import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth";
import ticketRoutes from "./routes/tickets";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// route handlers
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

// to test the API
app.get("/", (_req, res) => {
  res.send("Helpdesk Backend - TypeScript");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
