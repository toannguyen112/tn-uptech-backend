import { NextFunction, Request, Response } from 'express';
import { BaseController } from "./base.controller";
import { logger } from '../../utils/logger';
import Helper from '../../utils/Helper';
export class CommontController extends BaseController {

    public async emptyDirSync(req: Request, res: Response, next: NextFunction) {

        try {
             await Helper.emptyDirSync();
            res.status(200).send({ message: "clear images success" });

        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

}
