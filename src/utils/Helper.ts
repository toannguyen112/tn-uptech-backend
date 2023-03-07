const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";

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

  static applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
        Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
      });
    });
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

  static generateToken(model: any, dataObject: any = 'user') {
    try {
      let saveObjectToken;

      if (dataObject === 'admin') {
        saveObjectToken = { admin: { id: model.id, name: model.name } }
      }

      const token: string = jwt.sign(
        saveObjectToken,
        process.env.SERVER_JWT_SECRET,
        { expiresIn: process.env.SERVER_JWT_TIMEOUT }
      );

      model.tokens = model.tokens ? model.tokens.concat({ token }) : [{ token }];
      model.save();

      return token;
    } catch (error) {
      console.log(error);
    }
  }

  static async hashPassword(password: string = "123", number: number = 8) {
    return await bcrypt.hash(password, number);
  }

}
