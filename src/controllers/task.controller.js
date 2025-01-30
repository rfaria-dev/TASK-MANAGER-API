import { taskModel } from "../models/task.model.js";
import {
	notFoundError,
	objectIdCastError,
} from "../utils/errors/mongodb.errors.js";
import { notAllowedFieldsToUpdateError } from "../utils/errors/general.errors.js";

class TaskController {
	constructor(req, res) {
		this.req = req;
		this.res = res;
	}
	getAllTasks = async () => {
		try {
			const tasks = await taskModel.find({});
			this.res.status(200).send(tasks);
		} catch (err) {
			this.res.status(500).send(err.message);
		}
	};
	getTasksById = async () => {
		try {
			const taskId = this.req.params.id;
			const task = await taskModel.findById(taskId);

			if (!task) return notFoundError(this.res);
			this.res.status(200).send(task);
		} catch (err) {
			objectIdCastError(this.err, this.res);
		}
	};
	createTask = async () => {
		try {
			const newTask = new taskModel(this.req.body);
			await newTask.save();

			this.res.status(201).send(newTask);
		} catch (err) {
			this.res.status(500).send(err.message);
		}
	};
	deleteTasks = async () => {
		try {
			const taskId = this.req.params.id;
			const currentTask = await taskModel.findById(taskId);

			if (!currentTask) return notFoundError(this.res);

			const taskToBeDeleted = await taskModel.findByIdAndDelete(taskId);
			this.res.status(200).send(taskToBeDeleted);
		} catch (err) {
			objectIdCastError(this.err, this.res);
		}
	};
	updateTask = async () => {
		try {
			const taskId = this.req.params.id;
			const taskData = this.req.body;
			const allowedUpdates = ["isCompleted"];
			const requestedUpdates = Object.keys(taskData);

			// Filter allowed updates
			const updatesToApply = {};
			for (const update of requestedUpdates) {
				if (allowedUpdates.includes(update)) {
					updatesToApply[update] = taskData[update];
				} else {
					return notAllowedFieldsToUpdateError(this.res);
				}
			}
			// Update the document in the database
			const updatedTask = await taskModel.findByIdAndUpdate(
				taskId,
				updatesToApply,
				{ new: true, runValidators: true } // Return the updated document and run validations
			);

			// Check if the task exists
			if (!updatedTask) return notFoundError(this.res);

			// Return the updated task
			return this.res.status(200).send(updatedTask);
		} catch (err) {
			// Handle errors
			return this.res.status(500).send(err.message);
		}
	};
}
export { TaskController };
