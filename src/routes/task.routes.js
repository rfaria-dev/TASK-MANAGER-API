import express from "express";
import { taskModel } from "../models/task.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const tasks = await taskModel.find({});
		res.status(200).send(tasks);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
	try {
		const newTask = new taskModel(req.body);
		await newTask.save();

		res.status(201).send(newTask);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.delete("/:id", async (req, res) => {
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

router.patch("/:id", async (req, res) => {
	try {
		const taskId = req.params.id;
		const taskData = req.body;
		const allowedUpdates = ["isCompleted"];
		const requestedUpdates = Object.keys(taskData);

		// Filter allowed updates
		const updatesToApply = {};
		for (const update of requestedUpdates) {
			if (allowedUpdates.includes(update)) {
				updatesToApply[update] = taskData[update];
			} else {
				return res
					.status(400)
					.send(
						"Invalid update: One or more editable fields are not allowed to be updated"
					);
			}
		}
		// Update the document in the database
		const updatedTask = await taskModel.findByIdAndUpdate(
			taskId,
			updatesToApply,
			{ new: true, runValidators: true } // Return the updated document and run validations
		);

		// Check if the task exists
		if (!updatedTask) {
			return res.status(404).send("Task not found");
		}

		// Return the updated task
		return res.status(200).send(updatedTask);
	} catch (err) {
		// Handle errors
		return res.status(500).send(err.message);
	}
});

export { router as taskRouter };
