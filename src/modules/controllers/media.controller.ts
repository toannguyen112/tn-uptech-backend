import { Request, Response } from "express";
import { ApiFeatures } from "../../utils/ApiFeatures";

export default class MediaController {
  async index(req: Request, res: Response) {

    const query = { ...req.query };

    const objQuery = new ApiFeatures(query)
      .limitFields()
      .paginate()
      .getObjQuery();

    const { count, rows }: any = await File.findAndCountAll(objQuery);

    const result = {
      page: Number(query?.page) * 1,
      pageSize: Number(query?.page_size) * 1,
      pageCount: Math.ceil(count / Number(query?.page_size) * 1),
      totalItems: count || 0,
      data: rows.map((item: any) => File.transform(item)),
    };

    //     `CREATE FUNCTION dbo.GetJson (@parentID int)
    // RETURNS nvarchar(max)
    // AS BEGIN
    //     RETURN (
    //         SELECT
    //           id,
    //           name,
    //           typeid,
    //           [value],
    //           children = JSON_QUERY(dbo.GetJson(id))
    //         FROM folders p
    //         WHERE EXISTS (SELECT parent_id INTERSECT SELECT @parentID)
    //         FOR JSON PATH
    //     );
    // END;`

    //     await sequelize.query(`SELECT dbo.GetJson(NULL);`);

    return res.status(200).json({ message: "OK", data: [] });
  }

  async show(req: Request, res: Response) {
    try {
      const data = await File.findOne({
        where: {
          id: req.params.id
        },
      });
      return res.status(200).json({ message: "OK", data });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async store(req: Request, res: Response) {
    const images = req["files"];

    for await (const image of images) {
      await File.storeMedia(image)
    }
    const data = await File.findAll({});
    return res.status(200).json({ message: "OK", data });
  }

  async delete(req: Request, res: Response) {
    const data = await File.destroy({ where: { id: req.params.id } })
    if (data) return res.status(200).json({
      message: "Remove File Success",
    })
  }

}
