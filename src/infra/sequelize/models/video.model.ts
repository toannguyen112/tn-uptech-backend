

module.exports = function (sequelize, DataTypes) {
    const Video = sequelize.define(
        "videos",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            label: {
                type: DataTypes.STRING,
            },

            path: {
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
            tableName: "videos",
        },
    );

    return Video;
};
