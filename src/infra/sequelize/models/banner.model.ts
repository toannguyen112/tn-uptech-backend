import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Banner = sequelize.define(
        "banners",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },

            thumbnail: {
                type: DataTypes.INTEGER,
                references: {
                    model: "medias",
                    key: "id",
                },
            },

            status: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            position: {
                type: DataTypes.INTEGER,
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
            tableName: "banners",
        },
    );

    Banner.associate = function (models) {
        Banner.belongsTo(models.Media, {
            as: 'image',
            foreignKey: "thumbnail"
        });

        Banner.hasMany(models.BannerTranslation, {
            as: "translations",
            foreignKey: "banner_id"
        });
    };

    return Banner;
};
