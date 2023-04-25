
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { RecruitmentController } from "../modules/controllers/recruitment.controller";

export class RecruitmentsRoute implements Routes {
    public path = '/recruitments';
    public router = Router();
    public post = new RecruitmentController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.post.index);
        this.router.post(`${this.path}/create`, this.post.create);
        this.router.get(`${this.path}/show/:id`, this.post.show);
        this.router.put(`${this.path}/update/:id`, this.post.update);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.post.delete);
    }
}