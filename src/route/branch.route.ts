
import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { BranchController } from "../modules/controllers/branch.controller";
export class BranchRoute implements Routes {
    public path = '/branchs';
    public router = Router();
    public branch = new BranchController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.branch.index);
        this.router.get(`${this.path}/getListBranch`, this.branch.getListBranch);
        this.router.post(`${this.path}/create`, this.branch.create);
        this.router.get(`${this.path}/show/:id`, this.branch.show);
        this.router.put(`${this.path}/update/:id`, this.branch.update);
        this.router.delete(`${this.path}/delete/:id(\\d+)`, this.branch.delete);
    }
}