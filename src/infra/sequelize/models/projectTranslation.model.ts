
module.exports = function (sequelize, DataTypes) {
    const ProjectTranslation = sequelize.define(
        "project_translation",
        {
            id: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
            },

            project_id: {
                type: DataTypes.STRING,
                references: {
                    model: "projects",
                    key: "id",
                },
            },

            locale: {
                type: DataTypes.STRING,
                defaultValue: "vi",
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING,
                defaultValue: "",
                allowNull: false,
            },

            slug: {
                type: DataTypes.STRING,
                defaultValue: "",
            },

            description: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            content: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "project_translation",
        },
    );

    ProjectTranslation.associate = function (models) {
        ProjectTranslation.belongsTo(models.Project, {
            as: "project",
            foreignKey: "project_id",
        });
    }

    return ProjectTranslation;
};
