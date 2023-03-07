import { Router } from "express";
import SkillController from "../controllers/skill.controller";
const route: Router = Router();

route.get("/skills/index", new SkillController().index);
route.get("/skills/getLists", new SkillController().getLists);
route.post("/skills/create", new SkillController().create);
route.post("/skills/update/:id", new SkillController().update);
route.post("/skills/delete/:id", new SkillController().delete);

export default route;
