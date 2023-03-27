import models from ".";
import Helper from "../../../utils/helper";

module.exports = function (sequelize, DataTypes) {
    const Project = sequelize.define(
        "projects",
        {
            id: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
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

    // Project.addHook("afterFind", findResult => {
    //     if (!Array.isArray(findResult)) findResult = [findResult];
    //     for (const instance of findResult) {
    //         if (instance.commentableType === "image" && instance.image !== undefined) {
    //             instance.commentable = instance.image;
    //         } else if (instance.commentableType === "video" && instance.video !== undefined) {
    //             instance.commentable = instance.video;
    //         }

    //         delete instance.image;
    //         delete instance.dataValues.image;
    //         delete instance.video;
    //         delete instance.dataValues.video;
    //     }
    // });

    // Project.belongsTo(models.Media, { foreignKey: 'projecttableId', constraints: false });

    return Project;
};
