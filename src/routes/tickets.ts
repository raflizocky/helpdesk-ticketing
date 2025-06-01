import express from "express";
import auth from "../middleware/auth";
import {
  createTicket,
  getUserTickets,
  getAllTickets,
  updateTicketStatus,
} from "../controllers/ticketController";

const router = express.Router();

router.post("/", auth, createTicket);
router.get("/my", auth, getUserTickets);
router.get("/all", auth, getAllTickets);
router.put("/:id", auth, updateTicketStatus);

export default router;
