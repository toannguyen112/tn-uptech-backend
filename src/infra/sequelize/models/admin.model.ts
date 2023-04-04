module.exports = function (sequelize, DataTypes) {
    const Admin = sequelize.define(
        "admins",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },

            username: {
                allowNull: false,
                type: DataTypes.STRING,
            },

            name: {
                allowNull: true,
                type: DataTypes.STRING,
            },

            email: {
                allowNull: true,
                type: DataTypes.STRING,
            },

            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },

            tokens: {
                allowNull: true,
                type: DataTypes.JSON,
            },

            phone: {
                allowNull: true,
                type: DataTypes.INTEGER,
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
            tableName: "admins",
        },
    );

    return Admin;
};
