module.exports = function (sequelize, DataTypes) {
    const Folder = sequelize.define(
        "folders",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            parent_id: {
                type: DataTypes.INTEGER,
            },

            label: {
                type: DataTypes.STRING,
            },

            icon: {
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
            tableName: "folders",
        },
    );

    Folder.associate = function (models) {
        Folder.belongsTo(Folder, { as: 'parent', foreignKey: 'parent_id' })
        Folder.hasMany(Folder, { as: 'children', foreignKey: 'parent_id' })
    };

    return Folder;
};
