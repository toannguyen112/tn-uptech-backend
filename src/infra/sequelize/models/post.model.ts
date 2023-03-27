

module.exports = function (sequelize, DataTypes) {
    const Folder = sequelize.define(
        "posts",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            view: {
                type: DataTypes.INTEGER,
                defaultValue: 0
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
            tableName: "posts",
        },
    );

    return Folder;
};
