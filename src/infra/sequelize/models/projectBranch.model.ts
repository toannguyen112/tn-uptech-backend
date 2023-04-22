
module.exports = function (sequelize, DataTypes) {
    const ProjectBranch = sequelize.define(
        "project_branchs",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            project_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: "projects",
                    key: "id",
                },
            },

            branch_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: "branchs",
                    key: "id",
                },
            },

        },
        {
            timestamps: false,
            tableName: "project_branchs",
        },
    );

    return ProjectBranch;
};
