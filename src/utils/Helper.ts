const jwt = require("jsonwebtoken");
import slugify from 'slugify';
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import _ from 'lodash';
import fs from 'fs-extra'
interface ISEO {
  slug: string
  custom_slug: string
  meta_title: string
  meta_description: string
  meta_keyword: string
  meta_robots: string
  canonica_link: string
  meta_image: string
  meta_viewport: string
}
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

  static renderSlug(slug: string, options?: any) {
    return slugify(slug, {
      replacement: '-',  // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true,      // convert to lower case, defaults to `false`
      strict: false,     // strip special characters except replacement, defaults to `false`
      locale: 'vi',      // language code of the locale to use
      trim: true         // trim leading and trailing replacement chars, defaults to `true`
    });
  }

  static async hashPassword(password: string = "123", number: number = 8) {
    return await bcrypt.hash(password, number);
  }

  static FieldsSeo(item: ISEO) {
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
