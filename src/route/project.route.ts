
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { ProjectController } from "../modules/controllers/project.controller";

export class ProjectRoute implements Routes {
    public path = '/projects';
    public router = Router();
    public project = new ProjectController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.project.index);
        this.router.get(`${this.path}/getProjectsClient`, this.project.getProjectsClient);
        this.router.get(`${this.path}/findByIdClient/:id(\\d+)`, this.project.findByIdClient);
        this.router.get(`${this.path}/show/:id(\\d+)`, this.project.show);
        this.router.post(`${this.path}/create`, this.project.create);
        this.router.put(`${this.path}/update/:id`, this.project.update);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.project.delete);
        this.router.post(`${this.path}/deleteMultipleIds`, this.project.deleteMultipleIds);
    }
}
