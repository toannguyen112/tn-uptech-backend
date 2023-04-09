import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Admin = sequelize.define(
        "admins",
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
            tableName: "admins",
        },
    );

    Admin.associate = function (models) {
        Admin.belongsToMany(models.Role, {
            as: 'roles',
            foreignKey: "admin_id",
            through: models.AdminRole
        });
    };

    return Admin;
};
