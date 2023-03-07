import { Router } from "express";
import ContactController from "../controllers/contact.controller";
const route: Router = Router();

route.get("/contacts/index", new ContactController().index);
route.post("/contacts/create", new ContactController().create);
route.post("/contacts/update/:id", new ContactController().update);
route.post("/contacts/delete/:id", new ContactController().update);

export default route;
