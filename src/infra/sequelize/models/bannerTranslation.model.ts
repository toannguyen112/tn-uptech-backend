import Helper from '../../../utils/Helper';

module.exports = function (sequelize, DataTypes) {
    const BannerTranslation = sequelize.define(
        "banner_translation",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },

            name: {
                type: DataTypes.STRING,
            },

            slug: {
                type: DataTypes.STRING,
            },

            sub_name: {
                type: DataTypes.STRING,
            },

            desctiption: {
                type: DataTypes.STRING,
            },

            banner_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "banners",
                    key: "id",
                },
            },
        },
        {
            timestamps: false,
            tableName: "banner_translation",
        },
    );

    // BannerTranslation.associate = function (models) {
    //     BannerTranslation.belongsTo(models.Banner, {
    //         as: "banner",
    //         foreignKey: "banner_id",
    //     });
    // };

    return BannerTranslation;
};
