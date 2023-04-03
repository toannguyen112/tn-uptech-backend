
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

            slug: {
                allowNull: true,
                type: DataTypes.STRING,
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
        });
    }

    return CeoTranslation;
};
