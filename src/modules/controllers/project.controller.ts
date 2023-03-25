// import { Request, Response } from "express";
// import models from "../../infra/sequelize/models";
// import { ApiFeatures } from "../../utils/apiFeatures";

// const index = async (req: Request, res: Response) => {
//   try {
//     const query = { ...req.query };
//     const conditions = {};
//     const objQuery = new ApiFeatures(query)
//       .filter(conditions)
//       .paginate()
//       .paranoid()
//       .getObjQuery();

//     const { count, rows }: any = await models.Project.findAndCountAll(objQuery);

//     const result = {
//       page: Number(query?.page) * 1,
//       pageSize: Number(query?.page_size) * 1,
//       pageCount: Math.ceil(count / Number(query?.page_size) * 1),
//       totalItems: count || 0,
//       data: rows,
//     };

//     return res.status(200).json({ message: "success", data: result });

//   } catch (error) {
//     console.log(error);
//   }

// }

// const create = async (req: Request, res: Response) => {

//   try {
//     const data = await models.Project.create({ ...req.body });
//     return res.status(200).json({ message: "success", data });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

// const show = async (req: Request, res: Response) => {
//   try {
//     const data = await models.Project.findOne({
//       where: { id: req.params.id }
//     });

//     const projectDetail = data.transform(data);
//     return res.status(200).json({ message: "success", data: projectDetail });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

// const update = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const reqBody = req.body;

//     const body = {
//       "id": reqBody.id,
//       "name": reqBody.name,
//       "status": reqBody.status,
//       "description": reqBody.description,
//       "isFeatured": reqBody.isFeatured,
//       "content": reqBody.content,
//     }

//     const data = await models.Project.update(body, { where: { id } });

//     return res.status(200).json({ message: "success", data });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

// const deleteMultipleIds = async (req: Request, res: Response) => {
//   try {
//     const { ids } = req.body;
//     await models.Project.destroy({ where: { id: ids } }).then((result) => {
//       return res.status(200).json({ message: "success", data: result });
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

// const remove = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await models.Project.destroy({ where: { id } });

//     const data = await models.Project.findAll({});
//     return res.status(200).json({ message: "success", data: data });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

// export default { index, create, show, remove, deleteMultipleIds, update }