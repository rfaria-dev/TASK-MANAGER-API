import { taskModel } from "../models/task.model.js";

class TaskController {
	constructor(req, res) {
		this.req = req;
		this.res = res;
	}
	getTasks = async () => {
		try {
			const tasks = await taskModel.find({});
			this.res.status(200).send(tasks);
		} catch (err) {
			this.res.status(500).send(err.message);
		}
	};
}

export { TaskController };
