import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const AdminRole = sequelize.define(
        "admin_roles",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },

            admin_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
            },

            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
            },
        },
        {
            timestamps: false,
            tableName: "admin_roles",
        },
    );

    return AdminRole;
};
