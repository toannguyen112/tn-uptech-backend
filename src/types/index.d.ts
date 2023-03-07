export { };
declare global {
    namespace Express {
        interface Request {
            user: any;
            tenant: any;
            admin: any;
            token: string;
        }
    }
}