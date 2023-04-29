import { NextFunction, Request, Response } from 'express';

export interface LanguageRequest extends Request {
    lang: string
}

export const LangMiddleware = (req: LanguageRequest, res: Response, next: NextFunction) => {
    const lang = req.acceptsLanguages('vi', 'en', 'ja');

    if (lang) {
        global.lang = lang;
    }
    else {
        global.lang = 'vi';
    }

    

    next();
};