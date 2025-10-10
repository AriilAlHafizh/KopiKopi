'use strict';

// Gunakan CommonJS syntax
module.exports = { 
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'uuid');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'uuid', {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    });
  }
};