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

            banner_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "banners",
                    key: "id",
                },
            },

            name: {
                type: DataTypes.STRING,
            },

            sub_name: {
                type: DataTypes.STRING,
            },

            desctiption: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            tableName: "banner_translation",
        },
    );

    return BannerTranslation;
};
