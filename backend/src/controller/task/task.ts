import { Request, Response } from "express";
import { getMongoDBInstance } from "../../config/mongodb";
import { v4 as uuidv4 } from "uuid";

export const createTask = async (req: Request, res: Response) => {
    try {
        const { ownerId, title, description } = req.body;
        if (!ownerId || !title) {
             res.status(400).json({ message: "Missing required fields" });
             return
        }

        const db = await getMongoDBInstance();
        const tasks = db.collection("tasks");

        const task = {
            taskId: uuidv4(),
            ownerId,
            title,
            description: description || "",
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await tasks.insertOne(task);

        res.status(201).json({ message: "Task created", task });
    } catch (err) {
        console.error("Create Task Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const { ownerId } = req.params;

        const db = await getMongoDBInstance();
        const tasks = db.collection("tasks");

        const userTasks = await tasks.find({ ownerId }).toArray();
        res.status(200).json({ tasks: userTasks });
    } catch (err) {
        console.error("Get Tasks Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const editTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { title, description } = req.body;

        const db = await getMongoDBInstance();
        const tasks = db.collection("tasks");

        const result = await tasks.updateOne(
            { taskId },
            {
                $set: {
                    title,
                    description,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
             res.status(404).json({ message: "Task not found" });
             return
        }

        res.status(200).json({ message: "Task updated" });
    } catch (err) {
        console.error("Edit Task Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;

        const db = await getMongoDBInstance();
        const tasks = db.collection("tasks");

        const result = await tasks.deleteOne({ taskId });

        if (result.deletedCount === 0) {
             res.status(404).json({ message: "Task not found" });
             return
        }

        res.status(200).json({ message: "Task deleted" });
    } catch (err) {
        console.error("Delete Task Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const toggleTaskStatus = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;

        const db = await getMongoDBInstance();
        const tasks = db.collection("tasks");

        const task = await tasks.findOne({ taskId });

        if (!task) {
             res.status(404).json({ message: "Task not found" });
             return
        }

        const newStatus = task.status === "pending" ? "done" : "pending";

        await tasks.updateOne(
            { taskId },
            {
                $set: {
                    status: newStatus,
                    updatedAt: new Date()
                }
            }
        );

        res.status(200).json({ message: `Task marked as ${newStatus}` });
    } catch (err) {
        console.error("Toggle Task Status Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
