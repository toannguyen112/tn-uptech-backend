import { NextFunction, Request, Response } from 'express';
import { JobService } from '../../services/job.service';

const job = new JobService();

export class JobController {

    public async index(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await job.getList(req.query);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await await job.store(req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    public async getListFeatured(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await job.getListFeatured();
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await job.findById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    public async findByIdClient(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await job.findByIdClient(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await job.update(id, req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await job.deleteById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    public deleteMultipleIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.body;
            const data = await job.deleteMultipleIds(ids);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
}
