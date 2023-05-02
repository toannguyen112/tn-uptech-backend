
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

            locale: {
                type: DataTypes.STRING,
                defaultValue: "vi",
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING,
            },

            type: {
                type: DataTypes.STRING,
            },

            description: {
                type: DataTypes.TEXT('long'),
            },

            sub_name: {
                type: DataTypes.STRING,
            },

        },
        {
            timestamps: false,
            tableName: "banner_translation",
        },
    );

    BannerTranslation.associate = function (models) {
        BannerTranslation.belongsTo(models.Banner, {
            as: "banner",
            foreignKey: "banner_id",
        });
    }

    return BannerTranslation;
};
