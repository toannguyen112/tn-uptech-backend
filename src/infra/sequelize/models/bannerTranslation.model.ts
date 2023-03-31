import Helper from '../../../utils/Helper';

module.exports = function (sequelize, DataTypes) {
    const BannerTranslation = sequelize.define(
        "banner_translation",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
            },

            name: {
                type: sequelize.STRING,
            },

            slug: {
                type: sequelize.STRING,
            },

            sub_name: {
                type: sequelize.STRING,
            },

            desctiption: {
                type: sequelize.STRING,
            },

            banner_id: {
                type: sequelize.INTEGER,
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
