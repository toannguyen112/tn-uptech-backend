
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

        },
        {
            timestamps: false,
            tableName: "post_related",
        },
    );

    PostRelated.associate = function (models) {
        PostRelated.belongsTo(models.Post, { foreignKey: 'id' });
    };

    return PostRelated;
};
