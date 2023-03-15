import { Router } from "express";
import ProjectController from "../controllers/project.controller";
const route: Router = Router();

route.get("/projects/index", new ProjectController().index);
route.get("/projects/show/:id", new ProjectController().show);
route.post("/projects/create", new ProjectController().create);
route.put("/projects/update/:id", new ProjectController().update);
route.delete("/projects/delete/:id", new ProjectController().delete);
route.post("/projects/deleteMultipleIds", new ProjectController().deleteMultipleIds);

export default route;
