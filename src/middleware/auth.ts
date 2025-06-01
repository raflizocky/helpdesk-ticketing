import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

// custom types (req.user)
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// middlewares (jwt)
const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];

  // check header req
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Invalid or missing authorization header" });
    return;
  }

  // get user jwt token
  const token = authHeader.split(" ")[1];

  try {
    // verify token & decode
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = decoded; // attach to user info (req.user)
    next(); // call next middleware/route handler
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default auth;
