import { response } from "express";
export default class ApiResponse {
    static success(data: any = [], message: string = "OK", status: number = 200) {
        return response.status(status).json({
            success: true,
            message: message,
            data: data,
        });
    }

    static empty(message: string = "Not Found", status: number = 500) {
        return response.status(status).json({
            success: true,
            message: message,
            data: 'null'
        });
    }

    static failure(message: string = "failure", status: number = 400, errors: string) {
        return response.status(status).json({
            success: false,
            message: message,
            errors: errors,
        });
    }
}
