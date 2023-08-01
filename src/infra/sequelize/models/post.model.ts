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
                onDelete: 'SET NULL',
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
                get() {
                    return Helper.formatDayJs(this.getDataValue('posted_at'));
                }
            },

            view: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            ldjson: {
                type: DataTypes.JSON,
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

            fb: {
                type: DataTypes.STRING
            },

            linkedIn: {
                type: DataTypes.STRING
            },

            twitter: {
                type: DataTypes.STRING
            },

            dribbble: {
                type: DataTypes.STRING
            },

            orther_link: {
                type: DataTypes.STRING
            },

            deletedAt: {
                type: DataTypes.DATE
            },
        },
        {
            timestamps: true,
            tableName: "posts",
            paranoid: false,
            deletedAt: 'deletedAt',
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
            foreignKey: "ceo_id",
            onDelete: 'CASCADE',
            hooks: true
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
