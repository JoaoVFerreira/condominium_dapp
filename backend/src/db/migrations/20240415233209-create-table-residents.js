'use strict';

// Create residents table

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'residents',
        {
          id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          wallet: {
            type: Sequelize.STRING,
            allowNull: false
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          profile: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          phone: Sequelize.STRING,
          email: Sequelize.STRING,
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        },
        { transaction }
      );
      await Promise.all([
        queryInterface.addIndex('residents', {
          fields: ['id'],
          name: 'residents_id_idx',
          transaction
        }),
        queryInterface.addIndex('residents', {
          fields: ['wallet'],
          name: 'residents_wallet_idx',
          transaction
        })
      ]); 
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await Promise.all([
        queryInterface.removeIndex('residents', {
          fields: ['id'],
          transaction
        }),
        queryInterface.removeIndex('residents', {
          fields: ['wallet'],
          transaction
        })
      ]);
      await queryInterface.dropTable('residents', { transaction });
    });
  }
};
