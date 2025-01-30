import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";
import { connectToDataBase } from "./database/mongoose.database.js";
import { taskRouter } from "./routes/task.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

connectToDataBase();
app.use("/tasks", taskRouter);

app.listen(8000, () => {
	console.log(chalk.cyanBright("Server is running on port 8000!"));
});
