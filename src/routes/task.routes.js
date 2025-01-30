import express from "express";
import { TaskController } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", async (req, res) => {
	return new TaskController(req, res).getAllTasks();
});

router.get("/:id", async (req, res) => {
	return new TaskController(req, res).getTasksById();
});

router.post("/", async (req, res) => {
	return new TaskController(req, res).createTask();
});

router.delete("/:id", async (req, res) => {
	return new TaskController(req, res).deleteTasks();
});

router.patch("/:id", async (req, res) => {
	return new TaskController(req, res).updateTask();
});

export { router as taskRouter };
