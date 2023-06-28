require("dotenv").config();
const Sequelize = require("sequelize");

const { NODE_ENV, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

// console.log(NODE_ENV);
// console.log(DB_NAME);
// console.log(DB_USER);
// console.log(DB_PASS);
// console.log(DB_HOST);

const databaseCredentials = {
    development: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "mysql",
    },
    production: {
        username: "subhdkdm",
        password: "Pham18051987!!@#",
        database: "subhdkdm",
        host: 3306,
        dialect: "mysql",
    },
};
const { username, password, database, host, dialect } = NODE_ENV === 'production'
    ? databaseCredentials.production
    : databaseCredentials.development;

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

console.log(database);
console.log(username);
console.log(password);

module.exports.connection = new Sequelize(database, username, password, options);

