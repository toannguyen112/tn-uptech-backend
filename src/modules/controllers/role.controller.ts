import { NextFunction, Request, Response } from 'express';
import { BaseController } from "./base.controller";
import { logger } from '../../utils/logger';
import { RoleService } from '../../services/role.service';

const role = new RoleService();
export class RoleController extends BaseController {

    public async index(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await role.getList(req.query);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await await role.store(req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await role.findById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await role.update(id, req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await role.delete(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }
}
