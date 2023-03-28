import models from ".";
import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const ProjectRelated = sequelize.define(
        "project_related",
        {
            id: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
            },

            project_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "projects",
                    key: "id",
                },
            },

            project_realted_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "projects",
                    key: "id",
                },
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
            tableName: "project_related",
        },
    );

    ProjectRelated.associate = function (models) {
        ProjectRelated.belongsTo(models.Project, {foreignKey: 'id'});
    };

    return ProjectRelated;
};
