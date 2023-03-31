
module.exports = function (sequelize, DataTypes) {
    const Banner = sequelize.define(
        "banners",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
            },

            status: {
                type: sequelize.STRING,
                allowNull: true,
            },

            position: {
                type: sequelize.INTEGER,
                allowNull: true,
            },

            image: {
                type: sequelize.STRING,
            },

            createdAt: {
                type: sequelize.DATE,
                defaultValue: new Date(),
            },

            updatedAt: {
                type: sequelize.DATE,
                defaultValue: new Date(),
            },
        },
        {
            timestamps: true,
            tableName: "banners",
        },
    );

    Banner.associate = function (models) {

    };

    return Banner;
};
