
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

            content: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            description: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
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
        },
        {
            timestamps: false,
            tableName: "job_translation",
        },
    );

    JobTranslation.associate = function (models) {
        JobTranslation.belongsTo(models.Post, {
            as: "job",
            foreignKey: "job_id",
        });
    }

    return JobTranslation;
};
