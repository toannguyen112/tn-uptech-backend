
module.exports = function (sequelize, DataTypes) {
    const RolePermisson = sequelize.define(
        "role_permission",
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
            timestamps: true,
            tableName: "role_permission",
        },
    );

    RolePermisson.associate = function (models) { };

    return RolePermisson;
};
