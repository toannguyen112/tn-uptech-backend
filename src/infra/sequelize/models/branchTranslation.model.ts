import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const BranchTranslation = sequelize.define(
        "branch_translation",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            branch_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "branchs",
                    key: "id",
                },
            },

            name: {
                type: DataTypes.STRING,
            },

        },
        {
            timestamps: false,
            tableName: "branch_translation",
        },
    );

    BranchTranslation.associate = function (models) {

        BranchTranslation.belongsTo(models.Branch, {
            as: "branch",
            foreignKey: "branch_id"
        });

    };

    return BranchTranslation;
};
