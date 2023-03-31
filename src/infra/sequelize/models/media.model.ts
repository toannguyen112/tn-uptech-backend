import Helper from '../../../utils/Helper';

module.exports = function (sequelize, DataTypes) {
    const Media = sequelize.define(
        "medias",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            filename: {
                type: DataTypes.STRING,
            },

            disk: {
                type: DataTypes.STRING,
            },

            folder_id: {
                type: DataTypes.STRING,
                references: {
                    model: "folders",
                    key: "id",
                },
            },

            path: {
                type: DataTypes.STRING,
                get() {
                    return Helper.staticUrl(this.getDataValue('path'));
                }
            },

            extension: {
                type: DataTypes.STRING,
            },

            mime: {
                type: DataTypes.STRING,
            },

            size: {
                type: DataTypes.INTEGER,
            },

            width: {
                type: DataTypes.INTEGER,
            },

            height: {
                type: DataTypes.INTEGER,
            },

            alt: {
                type: DataTypes.STRING,
            },

            creator: {
                type: DataTypes.STRING,
            },

            editor: {
                type: DataTypes.STRING,
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
            tableName: "medias",
        },
    );

    Media.associate = function (models) {};

    return Media;
};
