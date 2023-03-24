import * as express from "express";
export class BaseController {

    public static jsonResponse(res: express.Response, code: number, message: string, data: any) {
        return res.status(code).json({ message, data });
    }

    public success<T>(res: express.Response, dto?: T, message: string = "Success") {
        if (!!dto) {
            res.type("application/json");
            return BaseController.jsonResponse(res, 200, message, dto);
        } else {
            return res.sendStatus(200);
        }
    }

    public created(res: express.Response, data?: object) {
        return BaseController.jsonResponse(res, 201, "", data);
    }

    public clientError(res: express.Response, message: string = "", data: any = null, code: number = 400) {
        return BaseController.jsonResponse(res, code, message, data);
    }

    public notFound(res: express.Response, message: string = "", data: any = null) {
        return BaseController.jsonResponse(res, 404, message, data);
    }

    public todo(res: express.Response) {
        return BaseController.jsonResponse(res, 400, "TODO", null);
    }

    public fail(res: express.Response, error: Error | string) {
        return BaseController.jsonResponse(res, 500, error.toString(), null);
    }
}
