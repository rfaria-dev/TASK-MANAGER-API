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
});

const taskModel = model("Task", taskSchema);

export { taskModel };
