
module.exports = function (sequelize, DataTypes) {
    const ProjectService = sequelize.define(
        "project_services",
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

            service_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: "services",
                    key: "id",
                },
            },

        },
        {
            timestamps: false,
            tableName: "project_services",
        },
    );

    return ProjectService;
};
