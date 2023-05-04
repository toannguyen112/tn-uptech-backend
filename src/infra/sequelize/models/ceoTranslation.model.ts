import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const CeoTranslation = sequelize.define(
        "ceo_translation",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },

            ceo_id: {
                type: DataTypes.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: "ceos",
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

            title: {
                type: DataTypes.STRING,
            },

            description: {
                type: DataTypes.TEXT('long'),
            },

            detail: {
                type: DataTypes.TEXT('long'),
            },

            date: {
                type: DataTypes.STRING,
            },

            phone: {
                type: DataTypes.STRING,
            },

            email: {
                type: DataTypes.STRING,
            },

            position: {
                type: DataTypes.STRING,
            },

            work_at: {
                type: DataTypes.STRING,
            },

            lang: {
                allowNull: true,
                type: DataTypes.STRING,
            },

            address: {
                allowNull: true,
                type: DataTypes.STRING,
            },

            social: {
                allowNull: true,
                type: DataTypes.STRING,
            },

            education: {
                allowNull: true,
                type: DataTypes.TEXT('long'),
            },

            slug: {
                type: DataTypes.STRING,
            },

            custom_slug: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_title: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_description: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_keyword: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_robots: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            canonica_link: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_image: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            meta_viewport: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "ceo_translation",
        },
    );

    CeoTranslation.associate = function (models) {
        CeoTranslation.belongsTo(models.Ceo, {
            as: "ceo",
            foreignKey: "ceo_id",
            onDelete: 'CASCADE', onUpdate: 'CASCADE'
        });
    }

    CeoTranslation.beforeSave(async (ceo, options) => {
        ceo.slug = Helper.renderSlug(ceo.name);
    });

    return CeoTranslation;
};
