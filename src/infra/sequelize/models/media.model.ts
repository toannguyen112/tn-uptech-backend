
import { Model } from 'sequelize';
import models from '.';
import { Media } from '../../../interface/Media.interface';
import Helper from '../../../utils/Helper';

export class MediaModel extends Model<Media> implements Media {
    public id: number;
    public filename: string;
    public disk: string;
    public path: string;
    public folder_id: string;
    public extension: string;
    public mime: string;
    public size: string;
    public width: string;
    public height: string;
    public alt: string;
    public creator: string;
    public editor: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

module.exports = function (sequelize, DataTypes): typeof MediaModel {
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

            project_id: {
                type: DataTypes.INTEGER,
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

    Media.associate = function (models) {
        Media.belongsTo(models.Project,
            {
                foreignKey: 'project_id',
                constraints: false
            });
    };

    return Media;
};
