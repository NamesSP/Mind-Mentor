'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('diary', 'time_stamp', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.addColumn('diary', 'label', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('diary', 'polarity', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('diary', 'time_stamp');
    await queryInterface.removeColumn('diary', 'label');
    await queryInterface.removeColumn('diary', 'polarity');
  }
};
