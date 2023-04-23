import { NextFunction, Request, Response } from 'express';

export class LogController {

    public async index(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

}
