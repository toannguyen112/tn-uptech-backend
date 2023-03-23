

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

            hierarchyLevel: {
                type: DataTypes.INTEGER,
            },

            name: {
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

    Folder.belongsTo(Folder, { as: 'parent', foreignKey: 'parent_id' })
    Folder.hasMany(Folder, { as: 'children', foreignKey: 'parent_id' })

    // Folder.belongsToMany(Folder, { as: 'descendents', foreignKey: 'ancestorId', through: models.FolderAncestor })
    // Folder.belongsToMany(Folder, { as: 'ancestors', foreignKey: 'folderId', through: models.FolderAncestor })

    return Folder;
};
