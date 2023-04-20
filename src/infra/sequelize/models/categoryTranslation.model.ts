import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const CategoryTranslation = sequelize.define(
        "category_translation",
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

            category_id: {
                type: DataTypes.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: "categories",
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

            description: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            tableName: "category_translation",
        },
    );

    CategoryTranslation.associate = function (models) {
        CategoryTranslation.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id",
        });
    }

    CategoryTranslation.beforeSave(async (category, options) => {
        category.slug = Helper.renderSlug(category.name);
    });

    return CategoryTranslation;
};
