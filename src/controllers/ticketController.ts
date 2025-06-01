import { Request, Response } from "express";
import pool from "../db";

// create a new ticket
export const createTicket = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!req.user) {
    res.status(401).json({ error: "Unauthorized: User not found" });
    return;
  }

  const userId = req.user.id;

  try {
    // insert ticket into 'tickets' table with status default is 'open'
    const result = await pool.query(
      "INSERT INTO tickets (user_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, description, "open"]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// get all tickets made by the user
export const getUserTickets = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized: User not found" });
    return;
  }

  const userId = req.user.id;

  try {
    // query tickets
    const result = await pool.query(
      "SELECT * FROM tickets WHERE user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// get all tickets (all role)
export const getAllTickets = async (_req: Request, res: Response) => {
  try {
    // query all tickets
    const result = await pool.query("SELECT * FROM tickets");
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// update ticket's status
export const updateTicketStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, assigned_to } = req.body;
  try {
    // query to set status & assigned tickets to who
    await pool.query(
      "UPDATE tickets SET status = $1, assigned_to = $2 WHERE id = $3",
      [status, assigned_to, id]
    );
    res.json({ message: "Updated" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
