
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
                hierarchy: true
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
