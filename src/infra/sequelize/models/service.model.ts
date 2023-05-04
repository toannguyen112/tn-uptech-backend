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

            isFeatured: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            layout_number: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },

            thumbnail: {
                type: DataTypes.INTEGER,
                references: {
                    model: "medias",
                    key: "id",
                },
                allowNull: true,
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

        Service.belongsTo(models.Media, {
            as: 'image',
            foreignKey: "thumbnail"
        });

        Service.belongsTo(Service, { as: 'parent', foreignKey: 'parent_id' })
        Service.hasMany(Service, { as: 'children', foreignKey: 'parent_id' })

        Service.belongsToMany(models.Project, {
            as: 'projects',
            foreignKey: "service_id",
            through: models.ProjectService
        });
    };

    return Service;
};
