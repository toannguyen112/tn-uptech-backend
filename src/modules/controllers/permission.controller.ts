import { NextFunction, Request, Response } from 'express';

import { logger } from '../../utils/logger';
import { PermissionService } from '../../services/permission.service';

const permisstion = new PermissionService();

export class PermissionController {

    public async index(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await permisstion.getList(req.query);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }
}
