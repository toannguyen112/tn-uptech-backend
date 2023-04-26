import Helper from "../../../utils/Helper";

module.exports = function (sequelize, DataTypes) {
    const Contact = sequelize.define(
        "contacts",
        {
            id: {
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },

            file_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "medias",
                    key: "id",
                },
                allowNull: true,
            },

            name: {
                type: DataTypes.STRING,
            },

            email: {
                type: DataTypes.STRING,
            },

            phone: {
                type: DataTypes.STRING,
            },

            note: {
                type: DataTypes.STRING,
            },

            type: {
                type: DataTypes.ENUM(['contact', 'recruitment']),
            },

            status: {
                type: DataTypes.ENUM(['active', 'inactive']),
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
            tableName: "contacts",
        },
    );

    Contact.associate = function (models) {
        Contact.belongsTo(models.Media, {
            as: 'file',
            foreignKey: "file_id"
        });
    };

    return Contact;
};
