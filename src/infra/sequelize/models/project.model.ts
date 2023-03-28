import models from ".";
import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Project = sequelize.define(
        "projects",
        {
            id: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING,
            },

            description: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            isFeatured: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            status: {
                type: DataTypes.STRING,
                defaultValue: 'active'
            },

            content: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
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
            tableName: "projects",
        },
    );

    Project.associate = function (models) {
        Project.hasMany(models.Media, {
            foreignKey: 'project_id',
            constraints: false,
        });
    };

    return Project;
};
