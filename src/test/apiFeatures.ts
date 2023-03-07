export class ApiFeatures {
    private query: any;
    private objQuery: object = {};
    constructor(query: any) {
        this.query = query;
        if (!this.query["page"]) {
            this.query.page = 1;
        }
        if (!this.query["page_size"]) {
            this.query.page_size = 20;
        }
    }

    filter(where = {}) {
        this.objQuery["where"] = where;
        return this;
    }

    sort(sortField = "createdAt", sortOrder = "DESC") {
        this.objQuery["order"] = [[sortField, sortOrder]];
        return this;
    }

    limitFields() {
        if (this.query?.fields) {
            const fields = this.query.fields.split(",");
            this.objQuery["attributes"] = fields;
        }
        return this;
    }

    includes(includes = []) {
        this.objQuery["include"] = includes;
        return this;
    }

    paginate() {
        const page = this.query?.page;
        const pageSize = this.query?.page_size;
        const offset = (page - 1) * pageSize;
        this.objQuery["limit"] = pageSize;
        this.objQuery["offset"] = offset;
        return this;
    }

    getObjQuery() {
        return this.objQuery;
    }
}
