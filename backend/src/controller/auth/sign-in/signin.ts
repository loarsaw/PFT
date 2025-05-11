import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getMongoDBInstance } from "../../../config/mongodb";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const db = await getMongoDBInstance();
    if (!db) {
      return res.status(500).json({ message: "DB connection failed" });
    }

    const privateCollection = db.collection("private");

    const user = await privateCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _password, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    console.error("Signin Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
