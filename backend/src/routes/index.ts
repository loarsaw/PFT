import express from "express";
import { signup } from "../controller/auth/sign-up/signup";
import { signin } from "../controller/auth/sign-in/signin";
import { createTask, deleteTask, editTask, getTasks, toggleTaskStatus } from "../controller/task/task";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/get-tasks" , getTasks)
router.get("/create-task" , createTask)
router.get("/edit-task" , editTask)
router.get("/delete-task" , deleteTask)
router.get("/toggle-task" , toggleTaskStatus)



export default router;