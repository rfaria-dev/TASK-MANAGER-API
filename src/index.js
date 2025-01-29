import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";
import { connectToDataBase } from "./database/mongoose.database.js";

dotenv.config();

const app = express();

connectToDataBase();

app.get("/tasks", (req, res) => {
	const tasks = [
		{
			description: "Estudar",
			isCompleted: false,
		},
		{
			description: "Ler um livro",
			isCompleted: false,
		},
	];
	res.status(200).send(tasks);
});

app.listen(8000, () => {
	console.log(chalk.cyanBright("Server is running on port 8000!"));
});
