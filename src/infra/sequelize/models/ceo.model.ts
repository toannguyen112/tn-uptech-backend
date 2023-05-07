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

            status: {
                type: DataTypes.STRING,
                defaultValue: 'active'
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

            deletedAt: {
                type: DataTypes.DATE
            },
        },
        {
            timestamps: true,
            paranoid: false,
            deletedAt: 'deletedAt',
            tableName: "ceos",
        },
    );

    Ceo.associate = function (models) {
        Ceo.belongsTo(models.Media, {
            as: 'image',
            foreignKey: "thumbnail"
        });

        Ceo.hasMany(models.Post, {
            foreignKey: "id",
        });

        Ceo.hasMany(models.CeoTranslation, {
            as: "translations",
            foreignKey: "ceo_id",
        });
    };

    return Ceo;
};
