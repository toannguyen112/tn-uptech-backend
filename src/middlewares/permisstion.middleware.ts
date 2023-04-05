import models from "../infra/sequelize/models";

export const checkPermission = (permission) => {
    return async (req, res, next) => {
        const userId = req.user.id;
        const user = await models.Admin.findByPk(userId, { include: models.Role });
        const roles = user.Roles;
        for (const role of roles) {
            const permissions = await role.getPermissions();
            if (permissions.map((p) => p.name).includes(permission)) {
                return next();
            }
        }
        return res.status(403).send("Access denied.");
    };
};
