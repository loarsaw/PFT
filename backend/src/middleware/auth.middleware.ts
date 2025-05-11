import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "akskla";
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: string };
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(400).json({ message: "Invalid token." });
    }
};
