import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { router } from "./http/api";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 10000,
    handler: function (req: Request, res: Response) {
        res.status(429).send({
            status: 500,
            message: "Too many requests!",
        });
    },
    skip: (req: Request) => {
        if (req.ip === "::ffff:127.0.0.1") return true;
        return false;
    },
});

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(apiLimiter);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.all("*", (req: Request, res: Response) => {
    res.status(404).send(`Can find ${req.originalUrl} on this server`);
});

const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`[App]: Server listening on ${process.env.HOST}:${process.env.PORT}`);
});

// MongoDBService.init();

process.on("uncaughtException", () => {
    server.close(() => {
        process.exit(1);
    });
});

export { app };
