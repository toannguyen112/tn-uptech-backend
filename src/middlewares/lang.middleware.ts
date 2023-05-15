import { NextFunction, Request, Response } from 'express';

export interface LanguageRequest extends Request {
    lang: string
}

export const LangMiddleware = (req: LanguageRequest, res: Response, next: NextFunction) => {

    next();
};