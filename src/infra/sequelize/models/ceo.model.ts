import Helper from "../../../utils/Helper";


module.exports = function (sequelize, DataTypes) {
    const Ceo = sequelize.define(
        "ceos",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },

            slug: {
                allowNull: true,
                type: DataTypes.STRING,
            },

            thumbnail: {
                type: DataTypes.INTEGER,
                references: {
                    model: "medias",
                    key: "id",
                },
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
            tableName: "ceos",
        },
    );

    Ceo.associate = function (models) {
        Ceo.belongsTo(models.Media, {
            as: 'image',
            foreignKey: "thumbnail"
        });

        Ceo.belongsTo(models.Media, {
            as: 'banner_image',
            foreignKey: "banner"
        });

        Ceo.hasMany(models.CeoTranslation, {
            as: "translations",
            foreignKey: "ceo_id"
        });
    };

    return Ceo;
};
