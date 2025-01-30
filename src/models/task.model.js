import { Schema, model } from "mongoose";

const taskSchema = new Schema({
	description: {
		type: String,
		required: true,
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

const taskModel = model("Task", taskSchema);

export { taskModel };
