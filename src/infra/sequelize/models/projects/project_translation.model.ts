import Helper from "../../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Project = sequelize.define(
        "project_translation",
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

            name: {
                type: DataTypes.STRING,
            },

            description: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
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
            tableName: "project_translation",
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
    };

    return Project;
};
