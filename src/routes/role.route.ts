import { Router } from "express";
import RoleController from "../controllers/role.controller";
import { adminAuth } from "../middlewares/adminAuth.middleware";

const route: Router = Router();

route.get("/role/index", adminAuth, new RoleController().index);
route.post("/role/create", new RoleController().create);
route.get("/role/show/:id", new RoleController().show);
route.put("/role/delete/:id", new RoleController().delete);
route.put("/role/update/:id", new RoleController().update);


export default route;
