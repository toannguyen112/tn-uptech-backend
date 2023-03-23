module.exports = function (sequelize, DataTypes) {
    const FolderAncestor = sequelize.define(
        "ancestries",
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
                type: DataTypes.STRING(254),
            },

            path: {
                type: DataTypes.STRING(254),
            },
        },
        {
            timestamps: true,
            tableName: "ancestries",
        },
    );


    return FolderAncestor;
};
