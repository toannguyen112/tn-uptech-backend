module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('posts', 'fb', { type: Sequelize.STRING }
      ),
      queryInterface.addColumn(
        'posts', 'linkedIn', { type: Sequelize.STRING }
      ),
      queryInterface.addColumn(
        'posts', 'twitter', { type: Sequelize.STRING }
      ),
      queryInterface.addColumn(
        'posts', 'dribbble', { type: Sequelize.STRING }
      ),
      queryInterface.addColumn(
        'posts', 'orther_link', { type: Sequelize.STRING }
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('posts', 'fb'),
      queryInterface.removeColumn('posts', 'linkedIn'),
      queryInterface.removeColumn('posts', 'twitter'),
      queryInterface.removeColumn('posts', 'dribbble'),
      queryInterface.removeColumn('posts', 'orther_link'),
    ]);
  },
};