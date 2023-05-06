import { NextFunction, Request, Response } from 'express';
import { BaseController } from "./base.controller";

import { logger } from '../../utils/logger';
import { ServiceService } from '../../services/service.service';

const service = new ServiceService();

export class ServiceController extends BaseController {

    public async index(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await service.getList(req.query);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async getListService(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await service.getListService();
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async getListFeatured(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await service.getListFeatured();
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async getNav(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await service.getNav();
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await await service.store(req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.findById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error);
        }
    }

    public async findByIdClient(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.findByIdClient(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await service.updateById(id, req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.deleteById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            logger.error(error);
            res.status(500).send(error.message);
        }
    }
}
