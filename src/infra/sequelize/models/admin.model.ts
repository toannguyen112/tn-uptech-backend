module.exports = function (sequelize, DataTypes) {
    const Admin = sequelize.define(
        "admins",
        {
            id: {
                type: DataTypes.STRING(20),
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING(254),
            },
        },
        {
            timestamps: true,
            tableName: "admins",
        },
    );

    return Admin;
};
