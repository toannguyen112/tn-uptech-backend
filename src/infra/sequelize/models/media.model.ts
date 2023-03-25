
import { Model } from 'sequelize';
import { Media } from '../../../interface/Media.interface';

export class MediaModel extends Model<Media> implements Media {
    public id: number;
    public filename: string;
    public disk: string;
    public path: string;
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

            disk: {
                type: DataTypes.STRING,
            },

            path: {
                type: DataTypes.STRING,
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
            },

            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },
        },
        {
            timestamps: true,
            tableName: "medias",
        },
    );

    return Media;
};
