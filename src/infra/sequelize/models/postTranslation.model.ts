import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define(
        "post_translation",
        {
            id: {
                type: DataTypes.INTEGER,
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

            content: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "post_translation",
        },
    );

    return Post;
};
