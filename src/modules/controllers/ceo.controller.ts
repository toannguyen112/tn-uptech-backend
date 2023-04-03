import { NextFunction, Request, Response } from 'express';
import { BaseController } from "./base.controller";
import { CeoService } from '../../services/ceo.service';

const ceo = new CeoService();

export class CeoController extends BaseController {

    public async index(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await ceo.getList(req.query);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await await ceo.store(req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ceo.findById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await ceo.updateById(id, req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ceo.deleteById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public deleteMultipleIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.body;
            const data = await ceo.deleteMultipleIds(ids);
            return this.success(res, data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

}
