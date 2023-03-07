import { Request, Response } from "express";
import Permission from "../models/permission";
import Role from "../models/role.model";
import RolePermission from "../models/role_permission";

export default class RoleController {
    async index(req: Request, res: Response) {
        try {
            const data = await Role.findAll({});

            return res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async create(req: Request, res: Response) {

        const { role_name, permissions } = req.body;

        const role = await Role.create({ role_name })

        for await (const permissionId of permissions) {
            await RolePermission.create({
                role_id: role.id,
                permission_id: permissionId
            })
        }

        const roles = await Role.findAll({})

        return res.status(200).json(roles);
    }

    async delete(req: Request, res: Response) {
        return res.status(200).json('home');
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const data = await Role.findOne({
                where: { id }, include: [Permission],
            });

            return res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async update(req: Request, res: Response) {
        const { role_id, role_name, permissions } = req.body;

        await RolePermission.destroy({ where: { role_id } });

        for await (const permission of permissions) {
            await RolePermission.create({ role_id, permission_id: permission });
        }

        const roles = await Role.findAll({})

        return res.status(200).json(roles);
    }
}
