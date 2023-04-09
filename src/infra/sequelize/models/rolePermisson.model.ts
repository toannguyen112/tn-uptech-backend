
module.exports = function (sequelize, DataTypes) {
    const RolePermission = sequelize.define(
        "role_permissions",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            role_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "roles",
                    key: "id",
                },
                allowNull: true,
            },

            permission_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "permissions",
                    key: "id",
                },
                allowNull: true,
            },

        },
        {
            timestamps: false,
            tableName: "role_permissions",
        },
    );


    return RolePermission;
};
