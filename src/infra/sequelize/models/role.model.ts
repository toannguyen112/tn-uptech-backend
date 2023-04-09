import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Role = sequelize.define(
        "roles",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING,
            },

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                get() {
                    return Helper.formatDayJs(this.getDataValue('createdAt'));
                }
            },

            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                get() {
                    return Helper.formatDayJs(this.getDataValue('updatedAt'));
                }
            },
        },
        {
            timestamps: true,
            tableName: "roles",
        },
    );

    Role.associate = function (models) {
        Role.belongsToMany(models.Permission, {
            as: 'permissions',
            foreignKey: "role_id",
            through: models.RolePermission
        });

        Role.belongsToMany(models.Admin, {
            as: 'admin',
            foreignKey: "role_id",
            through: models.AdminRole
        });
    };

    return Role;
};
