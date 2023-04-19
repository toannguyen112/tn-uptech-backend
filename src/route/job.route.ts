
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { JobController } from "../modules/controllers/job.controller";

export class JobRoute implements Routes {
    public path = '/jobs';
    public router = Router();
    public job = new JobController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.job.index);
        this.router.get(`${this.path}/getListFeatured`, this.job.getListFeatured);
        this.router.post(`${this.path}/create`, this.job.create);
        this.router.get(`${this.path}/find/:id`, this.job.findByIdClient);
        this.router.get(`${this.path}/show/:id`, this.job.show);
        this.router.put(`${this.path}/update/:id`, this.job.update);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.job.delete);
    }
}