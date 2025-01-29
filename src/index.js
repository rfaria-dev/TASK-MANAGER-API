import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";
import { connectToDataBase } from "./database/mongoose.database.js";
import { taskModel } from "./models/task.model.js";

dotenv.config();

const app = express();
app.use(express.json());

connectToDataBase();

app.get("/tasks", async (req, res) => {
	try {
		const tasks = await taskModel.find({});
		res.status(200).send(tasks);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.get("/tasks/:id", async (req, res) => {
	try {
		const taskId = req.params.id;
		const task = await taskModel.findById(taskId);

		if (!task) {
			return res.status(404).send("Task not found!");
		}

		res.status(200).send(task);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.post("/tasks", async (req, res) => {
	try {
		const newTask = new taskModel(req.body);
		await newTask.save();

		res.status(201).send(newTask);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.delete("/tasks/:id", async (req, res) => {
	try {
		const taskId = req.params.id;
		const currentTask = await taskModel.findById(taskId);

		if (!currentTask) {
			return res.status(404).send("Task not found!");
		}

		const taskToBeDeleted = await taskModel.findByIdAndDelete(taskId);
		res.status(200).send(taskToBeDeleted);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.listen(8000, () => {
	console.log(chalk.cyanBright("Server is running on port 8000!"));
});
