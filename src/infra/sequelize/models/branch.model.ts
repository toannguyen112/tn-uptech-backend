import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Branch = sequelize.define(
        "branchs",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                get() {
                    return Helper.formatDayJs(this.getDataValue('createdAt'));
                }
            },

            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                get() {
                    return Helper.formatDayJs(this.getDataValue('updatedAt'));
                }
            },
        },
        {
            timestamps: true,
            tableName: "branchs",
        },
    );

    Branch.associate = function (models) {

        Branch.hasMany(models.BranchTranslation, {
            as: "translations",
            foreignKey: "branch_id"
        });

        Branch.belongsToMany(models.Project, {
            as: 'projects',
            foreignKey: "branch_id",
            through: models.ProjectBranch
        });

    };

    return Branch;
};
