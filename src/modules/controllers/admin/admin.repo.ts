
export class AdmintRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    public async getList(): Promise<any> {
        return await this.models.Admin.findAndCountAll();
    }
}
