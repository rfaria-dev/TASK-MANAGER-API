import mongoose from "mongoose";

const notFoundError = (res) => {
	return res.status(404).send("Task not found in the database!");
};

const objectIdCastError = (err, res) => {
	if (err instanceof mongoose.CastError) {
		return res.status(400).send("Invalid Object ID");
	}
};

export { notFoundError, objectIdCastError };
