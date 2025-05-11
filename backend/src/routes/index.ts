import express from "express";
import { signup } from "../controller/auth/sign-up/signup";
import { signin } from "../controller/auth/sign-in/signin";
import { createTask, deleteTask, editTask, getTasks, toggleTaskStatus } from "../controller/task/task";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/tasks", getTasks); 
router.post("/tasks", createTask); 
router.put("/tasks/:id", editTask); 
router.delete("/tasks/:id", deleteTask); 
router.put("/tasks/:id/toggle", toggleTaskStatus); 

export default router;
