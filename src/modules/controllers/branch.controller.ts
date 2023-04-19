import { NextFunction, Request, Response } from 'express';
import { BranchService } from '../../services/branch.service';

const branch = new BranchService();
export class BranchController {

    public async index(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await branch.getList(req.query);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async getListBranch(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await branch.getListBranch();
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await await branch.store(req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await branch.findById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await branch.updateById(id, req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await branch.deleteById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public deleteMultipleIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.body;
            const data = await branch.deleteMultipleIds(ids);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

}
