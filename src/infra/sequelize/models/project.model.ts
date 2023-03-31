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
            as: "translation",
            foreignKey: "id"
        });

        Project.hasMany(models.ProjectRelated, {
            as: 'related',
            foreignKey: "id"
        });
    };

    return Project;
};
