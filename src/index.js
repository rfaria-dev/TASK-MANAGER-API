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
		res.status(500).send(err);
	}
});

app.post("/tasks", async (req, res) => {
	const newTask = new taskModel(req.body);

    await newTask.save();
	res.status(201).send(newTask);
});

app.listen(8000, () => {
	console.log(chalk.cyanBright("Server is running on port 8000!"));
});
