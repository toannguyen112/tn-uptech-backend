module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'banners',
        'thumbnail_mobile',
        {
          type: Sequelize.INTEGER,
          references: {
            model: "medias",
            key: "id",
          },
          allowNull: true,
          onDelete: 'SET NULL',
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('banners', 'thumbnail_mobile'),
    ]);
  },
};