import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Category = sequelize.define(
        "categories",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            status: {
                type: DataTypes.STRING,
                defaultValue: 'active'
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
            tableName: "categories",
        },
    );

    Category.associate = function (models) {
        Category.hasMany(models.CategoryTranslation, {
            as: "translations",
            foreignKey: "category_id"
        });
    };

    return Category;
};
