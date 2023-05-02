import Helper from "../../../utils/Helper";

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
                allowNull: false,
            },

            work_item: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },

            description: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            content: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            section_1: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            section_2: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            section_3: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            section_4: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            section_5: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            slug: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            custom_slug: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_title: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_description: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_keyword: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_robots: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            canonica_link: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_image: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_viewport: {
                type: DataTypes.STRING,
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

    ProjectTranslation.beforeSave(async (project, options) => {
        project.slug = Helper.renderSlug(project.name);
    });

    return ProjectTranslation;
};
