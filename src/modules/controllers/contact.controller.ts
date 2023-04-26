import { NextFunction, Request, Response } from 'express';
import { ContactService } from '../../services/contact.service';

const contact = new ContactService();

export class ContactController {

    public async index(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await contact.index(req.query);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await await contact.store(req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await contact.show(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await contact.update(id, req.body);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await contact.deleteById(req.params.id);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    public deleteMultipleIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.body;
            const data = await contact.deleteMultipleIds(ids);
            res.status(200).send({ message: "ok", data });
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
}
