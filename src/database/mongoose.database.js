import mongoose from "mongoose";
import chalk from "chalk";

const connectToDataBase = async () => {
	try {
		(
			await mongoose.connect(process.env.DB_URL, {
				dbName: "DataHubAPI",
			})
		).isObjectIdOrHexString(
			console.log(chalk.cyanBright("Connected to the MongoDb database!"))
		);
	} catch (err) {
		console.log(
			chalk.redBright.italic(
				"Error connecting to the MongoDb database!\n",
				err
			)
		);
	}
};

export { connectToDataBase };
