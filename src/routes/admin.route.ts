import { Router } from "express";
import AdminController from "../controllers/admin.controller";
import { adminAuth } from "../middlewares/adminAuth.middleware";

const route: Router = Router();

route.get("/admin/index", adminAuth, new AdminController().index);
route.get("/admin/show/:id", adminAuth, new AdminController().show);
route.put("/admin/update/:id", adminAuth, new AdminController().update);
route.post("/admin/login", new AdminController().login);
route.post("/admin/logout", adminAuth, new AdminController().logout);

export default route;
