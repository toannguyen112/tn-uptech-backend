import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const PostTranslation = sequelize.define(
        "post_translation",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },

            post_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "posts",
                    key: "id",
                },
            },

            locale: {
                type: DataTypes.STRING,
                defaultValue: "vi",
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            content: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            description: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            slug: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
            },

            custom_slug: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
            },

            meta_title: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_description: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_keyword: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_robots: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            canonica_link: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_image: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_viewport: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "post_translation",
        },
    );

    PostTranslation.associate = function (models) {
        PostTranslation.belongsTo(models.Post, {
            as: "post",
            foreignKey: "post_id",
        });
    }

    PostTranslation.beforeSave(async (post, options) => {
        post.slug = Helper.renderSlug(post.name);
    });

    return PostTranslation;
};
