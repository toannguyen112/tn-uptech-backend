import { NextFunction, Request, Response } from 'express';

export class LogController {

    public async index() {
        return res.status(200).send("ok");
    }

}
