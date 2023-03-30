import Helper from "../../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const PostRelated = sequelize.define(
        "post_related",
        {
            id: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
            },

            post_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "posts",
                    key: "id",
                },
            },

            post_realted_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "posts",
                    key: "id",
                },
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
            tableName: "post_related",
        },
    );

    PostRelated.associate = function (models) {
        PostRelated.belongsTo(models.Post, { foreignKey: 'id' });
    };

    return PostRelated;
};
