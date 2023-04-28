const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import models from "../infra/sequelize/models";
import _ from 'lodash';
import fs from 'fs-extra'
export default class Helper {

  public static langs = ['vi', 'en', 'ja'];
  
  static randomString(length: number): string {
    var result: string = "";
    var characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static staticUrl(path: string): string {
    return `${process.env.STATIC_URL}${path}`;
  }

  public static formatDayJs(date: any, format: string = "DD/MM/YYYY"): any {
    return dayjs(date).format(format);
  }

  public static getNodesFlatten = (nodes: any) => {

    let children: any = [];
    nodes.map((m: any) => {
      if (m.children && m.children.length) {
        children = [...children, ...m.children];
      }
      return m;
    });

    return nodes.concat(children.length ? Helper.getNodesFlatten(children) : children);
  };

  public static generateToken(model: any, dataObject: any = 'admin') {

    const saveObjectToken = { admin: { id: model.id, name: model.name, role_id: model.role_id } }

    const token: string = jwt.sign(
      saveObjectToken,
      process.env.SERVER_JWT_SECRET,
      { expiresIn: process.env.SERVER_JWT_TIMEOUT }
    );

    model.tokens = model.tokens ? model.tokens.concat({ token }) : [{ token }];
    model.save();

    return token;
  }

  public static async emptyDirSync() {
    try {
      await fs.emptyDirSync('./storage/uploads');
      console.log('success!');
    } catch (err) {
      console.error(err)
    }
  }

  static transformRichText(data: string) {
    return `<div>${data}</div>`;
  }

  static renderSlug(slug: string) {
    return slug.toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
  }

  static async hashPassword(password: string = "123", number: number = 8) {
    return await bcrypt.hash(password, number);
  }

  static FieldsSeo(item) {
    return {
      slug: item.slug || "",
      custom_slug: item.custom_slug || "",
      meta_title: item.meta_title || "",
      meta_description: item.meta_description || "",
      meta_keyword: item.meta_keyword || "",
      meta_robots: item.meta_robots || "",
      canonica_link: item.canonica_link || "",
      meta_image: item.meta_image || "",
      meta_viewport: item.meta_viewport || "",
    }
  }

}
