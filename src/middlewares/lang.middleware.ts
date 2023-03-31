import { NextFunction, Request, Response } from 'express';

export interface LanguageRequest extends Request {
    lang: string
}

export const LangMiddleware = (req: LanguageRequest, res: Response, next: NextFunction) => {
    const lang = req.acceptsLanguages('vi', 'en');
    
    console.log(req.get('Accept-Language'));

    next();
};