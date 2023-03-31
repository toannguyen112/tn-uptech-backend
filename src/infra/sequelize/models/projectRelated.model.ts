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

            project_related_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "projects",
                    key: "id",
                },
            },

        },
        {
            timestamps: true,
            tableName: "project_related",
        },
    );

    ProjectRelated.associate = function (models) {
        ProjectRelated.belongsTo(models.Project, { foreignKey: 'id' });

        ProjectRelated.belongsTo(models.Project, {
            as: 'related',
            foreignKey: "project_id"
        });
    };

    return ProjectRelated;
};
