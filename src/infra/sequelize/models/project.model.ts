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

            thumbnail: {
                type: DataTypes.STRING,
                references: {
                    model: "medias",
                    key: "id",
                },
            },

            banner: {
                type: DataTypes.STRING,
                references: {
                    model: "medias",
                    key: "id",
                },
            },

            related: {
                type: DataTypes.JSON,
                defaultValue: [],
                allowNull: true,
            },

            images: {
                type: DataTypes.JSON,
                defaultValue: []
            },

            isFeatured: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            status: {
                type: DataTypes.STRING,
                defaultValue: 'active'
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

        Project.belongsTo(models.Media, {
            as: 'image',
            foreignKey: "thumbnail"
        });

        Project.belongsTo(models.Media, {
            as: 'banner_image',
            foreignKey: "banner"
        });

        Project.hasMany(models.ProjectTranslation, {
            as: "translations",
            foreignKey: "project_id"
        });

        Project.belongsToMany(models.Branch, {
            as: 'branchs',
            foreignKey: "project_id",
            through: models.ProjectBranch
        });

        Project.belongsToMany(models.Service, {
            as: 'services',
            foreignKey: "project_id",
            through: models.ProjectService
        });

    };

    return Project;
};
