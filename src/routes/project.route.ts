import { Router } from "express";
import ProjectController from "../controllers/project.controller";
const route: Router = Router();

route.get("/projects/index", new ProjectController().index);
route.post("/projects/create", new ProjectController().create);
route.post("/projects/update/:id", new ProjectController().update);
route.post("/projects/delete/:id", new ProjectController().update);

export default route;
