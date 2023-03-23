module.exports = function (sequelize, DataTypes) {
    const Admin = sequelize.define(
        "admins",
        {
            id: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: true,
            tableName: "admins",
        },
    );

    return Admin;
};
