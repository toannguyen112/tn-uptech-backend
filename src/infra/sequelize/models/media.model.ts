
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Folder } from '../../../interface/folder.interface';


export class MediaModel extends Model<Folder> implements Folder {
    public id: number;
    public parent_id: string;
    public label: string;
    public icon: string;
    public path: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

module.exports = function (sequelize, DataTypes): typeof MediaModel {
    const Folder = sequelize.define(
        "medias",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            parent_id: {
                type: DataTypes.INTEGER,
                hierarchy: true
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

    Folder.associate = function (models) {

    };

    return Folder;
};
