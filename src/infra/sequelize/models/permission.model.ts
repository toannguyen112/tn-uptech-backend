import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Permission = sequelize.define(
        "permissions",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING,
            },

            value: {
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
            tableName: "permissions",
        },
    );

    Permission.associate = function (models) {
        Permission.belongsToMany(models.Role, {
            as: 'roles',
            foreignKey: "permission_id",
            through: models.RolePermission
        });
    };

    return Permission;
};
