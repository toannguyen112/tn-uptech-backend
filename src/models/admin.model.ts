import { Table, PrimaryKey, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Helper from '../utils/Helper';
import { Request, Response } from "express";

interface typeTokens {
  token: string
}
@Table({
  tableName: "admins",
  timestamps: true,
})
class Admin extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  password: string;

  @Column({
    type: DataType.JSON,
    get() {
      return this.getDataValue('tokens');
    }
  })
  tokens: Array<typeTokens>;

  @Column
  username: string;

  @Column
  address: string;

  @Column
  phone: string;

  async login(req: Request, res: Response): Promise<any> {
    try {
      const foundAdmin = await Admin.findOne({ where: { username: req.body.username } });

      if (!foundAdmin) return res.status(500).send("Name of admin is not correct");

      const isMatch: boolean = req.body.password === foundAdmin.password;

      if (isMatch) {

        const token = Helper.generateToken(foundAdmin, 'admin');

        return res.status(200).json({
          message: "login successfully",
          data: foundAdmin,
          token: token,
        });
      }

      return res.status(500).send("Password is not correct");

    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

  async logout(req: Request, res: Response): Promise<any> {
    try {
      req.admin.tokens = req.admin.tokens.filter((item: any) => { return item.token !== req.token; });
      await req.admin.save();
      res.status(200).send({ message: "Logout successfully" });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }

}

export default Admin;
