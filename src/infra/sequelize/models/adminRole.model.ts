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

            username: {
                allowNull: false,
                type: DataTypes.STRING,
            },

            name: {
                allowNull: true,
                type: DataTypes.STRING,
            },

            email: {
                allowNull: true,
                type: DataTypes.STRING,
            },

            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },

            tokens: {
                allowNull: true,
                type: DataTypes.JSON,
            },

            phone: {
                allowNull: true,
                type: DataTypes.INTEGER,
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
            tableName: "admin_roles",
        },
    );

    return AdminRole;
};
