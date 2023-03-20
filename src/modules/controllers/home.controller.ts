import { Request, Response } from "express";
export default class HomeController {
  async index(req: Request, res: Response) {
    return res.status(200).json('toannguyen.work');
  }
}
