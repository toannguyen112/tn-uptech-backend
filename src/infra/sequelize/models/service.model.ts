import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Service = sequelize.define(
        "services",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            parent_id: {
                type: DataTypes.INTEGER,
                defaultValue: 0
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
            tableName: "services",
        },
    );

    Service.associate = function (models) {
        Service.hasMany(models.ServiceTranslation, {
            as: "translations",
            foreignKey: "service_id"
        });
    };

    return Service;
};
