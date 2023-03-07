import { Request, Response } from "express";
import Permission from "../models/permission";
export default class PermissionController {
    async index(req: Request, res: Response) {
        try {
            const data = await Permission.findAll({});

            return res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            await Permission.create(req.body);

            const data = await Permission.findAll({});
            return res.status(200).json({ message: "OK", data: data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id, body } = req.params;

            await Permission.update({ body }, { where: { id } });

            const data = await Permission.findAll({});
            return res.status(200).json({ message: "OK", data: data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await Permission.destroy({ where: { id } });
            const rooms = await Permission.findAll({});
            return res.status(200).json({ message: "OK", data: rooms });
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
