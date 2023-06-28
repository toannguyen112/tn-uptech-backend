require("dotenv").config();
const Sequelize = require("sequelize");

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const options = {
    host: DB_HOST,
    dialect: "mysql",
    port: 3306,
    dialectOptions: {
        multipleStatements: true,
        connectTimeout: 220000,
        requestTimeout: 300000
    },
    pool: {
        max: 100,
        min: 0,
        idle: 200000,
        acquire: 1000000,
    },
    logging: (query, time) => {
        // new Logger.info(time + 'ms' + ' ' + query);
    },
    benchmark: true,
};

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
    options.ssl = true;
    options.dialectOptions.ssl = {
        require: true,
        rejectUnauthorized: false,
    };
}

module.exports.connection = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    options);

