import { NextFunction, Request, Response } from 'express';
import { BaseController } from "./base.controller";
import { logger } from '../../utils/logger';
import Helper from '../../utils/Helper';
export class CommontController extends BaseController {

    public async emptyDirSync(req: Request, res: Response, next: NextFunction) {
    }

    public async index(req: Request, res: Response, next: NextFunction) {

        res.status(200).send({ message: "Uptech API" });
    }

}
