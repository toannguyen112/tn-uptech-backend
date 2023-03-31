
module.exports = function (sequelize, DataTypes) {
    const Banner = sequelize.define(
        "banners",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },

            status: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            position: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

            image: {
                type: DataTypes.STRING,
            },

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },

            updatedAt: {
                type: DataTypes.DATE,
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
