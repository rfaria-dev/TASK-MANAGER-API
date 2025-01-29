import mongoose from "mongoose";
import chalk from "chalk";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@datahubapi.r1z9h.mongodb.net/?retryWrites=true&w=majority&appName=DataHubAPI`;
const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectToDataBase = async () => {
    try {
        (await mongoose.connect(process.env.DB_URL)).isObjectIdOrHexString(
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
