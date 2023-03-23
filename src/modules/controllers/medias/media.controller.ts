import { Request, Response } from "express";
import models from "../../../infra/sequelize/models";

const findDescendants = async (categoryId = 1) => {
  const recursiveQuery = `
  WITH RECURSIVE category_tree(id, name, parent_id) AS (
       SELECT id, name, parent_id 
       FROM folders WHERE id = '${categoryId}'
       UNION ALL
       SELECT c.id, c.name, c.parent_id
       FROM folders c
       INNER JOIN category_tree ct ON c.parent_id = ct.id
     )
     SELECT * FROM category_tree;`;
  
  try {
    return await models.sequelize.query(recursiveQuery,
      { type: models.sequelize.QueryTypes.SELECT });
  } catch (error) {
    console.log(error);
  }
};

export const index = async (req: Request, res: Response) => {
  try {

    const folders = await findDescendants(1);
    return res.status(200).json({ message: "OK", data: folders });

  } catch (error) {
    console.log(error);
  }
}

export const show = async (req: Request, res: Response) => {
  try {
    const data = await models.File.findOne({
      where: {
        id: req.params.id
      },
    });
    return res.status(200).json({ message: "OK", data });
  } catch (error) {
    res.status(500).send(error);
  }
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
