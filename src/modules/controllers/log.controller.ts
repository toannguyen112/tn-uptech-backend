import { NextFunction, Request, Response } from 'express';

export class LogController {

    public async index(req: Request, res: Response, next: NextFunction) {
        return res.status(200).send("ok");
    }

}
