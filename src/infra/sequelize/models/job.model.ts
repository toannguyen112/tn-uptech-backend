import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Job = sequelize.define(
        "jobs",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            related: {
                type: DataTypes.JSON,
                defaultValue: [],
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

            view: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            expried_date: {
                type: DataTypes.DATE,
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
            tableName: "jobs",
        },
    );

    Job.associate = function (models) {
        Job.hasMany(models.JobTranslation, {
            as: "translations",
            foreignKey: "job_id"
        });
    };

    return Job;
};
