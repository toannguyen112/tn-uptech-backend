import { env } from "process";
import mongoose from "mongoose";

export default class MongoDBService {
    static async init() {
        await mongoose
            .connect(`${env.DB_MONGODB_URL}`)
            .catch((error) => console.log(error));

        console.log(`Successfully connected to database MongoDB: ${env.DB_NAME}`);
    }
}
