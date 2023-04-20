import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const JobTranslation = sequelize.define(
        "job_translation",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },

            job_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "jobs",
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
                allowNull: false,
            },

            location: {
                type: DataTypes.STRING,
            },

            benefit: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            required: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            address_work: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            description: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            slug: {
                type: DataTypes.STRING,
                allowNull: true,
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
            tableName: "job_translation",
        },
    );

    JobTranslation.associate = function (models) {
        JobTranslation.belongsTo(models.Job, {
            as: "job",
            foreignKey: "job_id",
        });
    }

    JobTranslation.beforeSave(async (job, options) => {
        job.slug = Helper.renderSlug(job.name);
    });

    return JobTranslation;
};
