import jwt, { Secret } from "jsonwebtoken";
import { env } from "process";
import { Request, Response, NextFunction } from "express";
import models from "../../infra/sequelize/models";

export const SERVER_JWT_SECRET: Secret = env.SERVER_JWT_SECRET;

export const adminAuth = async (req, res: Response, next: NextFunction) => {
    try {
        const token: string = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) return res.status(401).send({ message: 'Not found token' });

        const decoded: any = jwt.verify(token, SERVER_JWT_SECRET);

        const admin = await models.Admin.findOne({ where: { id: decoded.admin.id } });

        const hasToken = admin.tokens.find((t: { token: string }) => t.token === token);

        if (!hasToken || !admin) throw new Error();

        req.admin = admin;
        req.token = token;

        next();

    } catch (err) {
        return res.status(401).send({ message: 'Please authenticate admin' });
    }
};