import express from "express";
import { signup } from "../controller/sign-up/signup";
import { signin } from "../controller/sign-in/signin";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

export default router;