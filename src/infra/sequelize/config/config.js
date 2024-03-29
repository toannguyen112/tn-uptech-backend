require("dotenv").config();
const Sequelize = require("sequelize");

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const databaseCredentials = {
    development: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "mysql",
    },
    test: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "mysql",
    },
    production: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "mysql",
    },
};
const { username, password, database, host, dialect } = databaseCredentials.development;

module.exports = databaseCredentials;

const options = {
    host,
    dialect,
    port: 3306,
    dialectOptions: {
        multipleStatements: true,
        connectTimeout: 220000,
        requestTimeout: 300000
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
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

module.exports.connection = new Sequelize(database, username, password, options);

