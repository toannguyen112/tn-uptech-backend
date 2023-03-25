import { Request, Response } from "express";
import models from "../../infra/sequelize/models";

export const index = async (req: Request, res: Response) => {

}

export const show = async (req: Request, res: Response) => {

}

export const store = async (req: Request, res: Response) => {
  const images = req["files"];

  for await (const image of images) {
    await models.File.storeMedia(image)
  }
  const data = await models.File.findAll({});
  return res.status(200).json({ message: "OK", data });
}

export default { index, store, show }
