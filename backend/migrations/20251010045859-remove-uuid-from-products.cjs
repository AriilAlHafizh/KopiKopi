'use strict';

// Gunakan CommonJS syntax
module.exports = { 
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'uuid');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'uuid', {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    });
  }
};