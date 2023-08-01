module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'posts',
        'ldjson',
        {
          type: Sequelize.JSON,
        },
      ),
      queryInterface.addColumn(
        'projects',
        'ldjson',
        {
          type: Sequelize.JSON,
        },
      ),
      queryInterface.addColumn(
        'services',
        'ldjson',
        {
          type: Sequelize.JSON,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('banners', 'ldjson'),
      queryInterface.removeColumn('projects', 'ldjson'),
      queryInterface.removeColumn('services', 'ldjson'),
    ]);
  },
};