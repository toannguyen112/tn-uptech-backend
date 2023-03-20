import { Request, Response } from "express";
import models from "../../../infra/sequelize/models";
import { AdmintRepo } from "../../repos/admin.repo";
import { BaseController } from "../base.controller";

const adminRepo = new AdmintRepo(models);

export default class AdminController extends BaseController {

    async index(req: Request, res: Response) {
        const data = await adminRepo.getList();
        return res.status(200).json(data);
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await models.Admin.findOne({ where: { id }, include: [] });
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
