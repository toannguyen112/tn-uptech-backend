import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import path from "path";
dotenv.config();

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const optionsProduction = {
  database: "i5oklw12f233xcl4",
  username: "d8qsslqasqbis50u",
  password: "fn0h7jbwc8og3crh",
  host: "z5zm8hebixwywy9d.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
}

const optionsDevelopment = {
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
}

// Create conditional Sequelize database options here
const sequelizeOptions = process.env.NODE_ENV === 'production'
  ? optionsProduction
  : optionsDevelopment

export default class SequelizeService {
  static async init() {

    try {
      let sequelize = new Sequelize({
        dialect: "mysql",
        port: 3306,
        logging: false,
        ...sequelizeOptions,
        ssl: false,
        define: {
          timestamps: false,
        },
      });

      sequelize
        .authenticate()
        .then(() => {
          console.log("Connection has been established successfully.");
        })
        .catch((error) => {
          console.error("Unable to connect to the database: ", error);
        });

      // init sequelize model
      sequelize.addModels([path.resolve(__dirname, `../models/`)]);

      console.log("Database service initialized");
    } catch (error) {
      console.log("Error during database service initialization");
      throw error;
    }
  }
}
