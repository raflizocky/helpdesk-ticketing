import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db";

// user registration
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);

    // insert
    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [name, email, hash, role]
    );
    res.status(201).json({ message: "User registered" });
  } catch (err: any) {
    next(err);
  }
};

// user login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // get user
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    const user = userResult.rows[0];
    const match = await bcrypt.compare(password, user.password); //compare password
    if (!match) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    // create jwt token for user (id & role), expired in 1 day
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.json({ token, user });
  } catch (err: any) {
    next(err);
  }
};
