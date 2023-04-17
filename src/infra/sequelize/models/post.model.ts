import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define(
        "posts",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            thumbnail: {
                type: DataTypes.INTEGER,
                references: {
                    model: "medias",
                    key: "id",
                },
                allowNull: true,
            },

            category_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "categories",
                    key: "id",
                },
                allowNull: true,
            },

            ceo_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "ceos",
                    key: "id",
                },
                allowNull: true,
            },

            related: {
                type: DataTypes.JSON,
                defaultValue: [],
                allowNull: true,
            },

            banner: {
                type: DataTypes.INTEGER,
                references: {
                    model: "medias",
                    key: "id",
                },
            },

            isFeatured: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            status: {
                type: DataTypes.STRING,
                defaultValue: 'active'
            },

            posted_at: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },

            // view: {
            //     type: DataTypes.INTEGER,
            //     defaultValue: 0
            // },

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
            tableName: "posts",
        },
    );

    Post.associate = function (models) {
        Post.belongsTo(models.Media, {
            as: 'image',
            foreignKey: "thumbnail"
        });

        Post.belongsTo(models.Media, {
            as: 'banner_image',
            foreignKey: "banner"
        });

        Post.belongsTo(models.Ceo, {
            as: 'ceo',
            foreignKey: "ceo_id"
        });

        Post.hasMany(models.PostTranslation, {
            as: "translations",
            foreignKey: "post_id"
        });

        Post.belongsTo(models.Category, {
            as: 'category',
            foreignKey: "category_id"
        });
    };

    return Post;
};
