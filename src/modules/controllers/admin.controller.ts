import { Request, Response } from "express";
import models from "../../infra/sequelize/models";
import { BaseController } from "./base.controller";

export default class AdminController extends BaseController {

    async index(req: Request, res: Response) {
        return res.status(200).json("");
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await models.Admin.findOne({ where: { id } });
            return res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async update(req: Request, res: Response) {
        await models.Admin.update({ ...req.body },
            { where: { id: req.params.id } });

        const admin = await models.Admin.findAll({});

        return res.status(200).json(admin);
    }
}
