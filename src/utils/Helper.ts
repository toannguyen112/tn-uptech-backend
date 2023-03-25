const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import models from "../infra/sequelize/models";
import _ from 'lodash';
export default class Helper {
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

  static transformRichText(data: string) {
    return `<div>${data}</div>`;
  }

  static queryNumberChildren(prop: number) {
    const includes = [];
    for (let index = 0; index < prop; index++) {
      includes.push({
        model: models.Folder,
        as: "children",
      })
    }

    return includes;
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

}
