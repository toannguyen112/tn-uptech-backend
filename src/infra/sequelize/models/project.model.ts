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

    Project.associate = function (models) { };

    return Project;
};
