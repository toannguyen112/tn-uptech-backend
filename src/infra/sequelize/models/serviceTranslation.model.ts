import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const ServiceTranslation = sequelize.define(
        "service_translation",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            service_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "services",
                    key: "id",
                },
            },

            name: {
                type: DataTypes.STRING,
            },

            description: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            section_1: {
                allowNull: true,
                type: DataTypes.JSON,
                defaultValue: {}
            },

            section_2: {
                allowNull: true,
                type: DataTypes.JSON,
                defaultValue: {}
            },

            section_3: {
                allowNull: true,
                type: DataTypes.JSON,
                defaultValue: {}
            },

            section_4: {
                allowNull: true,
                type: DataTypes.JSON,
                defaultValue: {}
            },

            section_5: {
                allowNull: true,
                type: DataTypes.JSON,
                defaultValue: {}
            },

            locale: {
                type: DataTypes.STRING,
                defaultValue: "vi",
                allowNull: false,
            },

            slug: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
            },

            custom_slug: {
                type: DataTypes.STRING,
                unique: true,
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
            tableName: "service_translation",
        },
    );

    ServiceTranslation.associate = function (models) {
        ServiceTranslation.belongsTo(models.Service, {
            as: "service",
            foreignKey: "service_id",
        });
    }

    ServiceTranslation.beforeSave(async (service, options) => {
        service.slug = Helper.renderSlug(service.name);
    });

    return ServiceTranslation;
};
