module.exports = function (sequelize, DataTypes) {
    const Project = sequelize.define(
        "projects",
        {
            id: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING,
            },

            description: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },

            isFeatured: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            status: {
                type: DataTypes.STRING,
                defaultValue: 'active'
            },

            content: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "projects",
        },
    );

    return Project;
};
