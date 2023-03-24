
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type FolderCreationAttributes = Optional<Folder, 'id' | 'email' | 'password'>;

export class FolderModel extends Model<Folder, FolderCreationAttributes> implements Folder {
    public id: number;
    public parent_id: string;
    public label: string;
    public icon: string;
    public path: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

module.exports = function (sequelize, DataTypes): typeof FolderModel {
    const Folder = sequelize.define(
        "folders",
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

            label: {
                type: DataTypes.STRING,
            },

            icon: {
                type: DataTypes.STRING,
            },

            path: {
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
            tableName: "folders",
        },
    );

    Folder.associate = function (models) {
        Folder.belongsTo(Folder, { as: 'parent', foreignKey: 'parent_id' })
        Folder.hasMany(Folder, { as: 'children', foreignKey: 'parent_id' })
    };

    Folder.prototype.getRoot = async function () {

    };

    return Folder;
};
