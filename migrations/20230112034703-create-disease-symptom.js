'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
    return queryInterface.createTable('DiseaseSymptoms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DiseaseId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Diseases'
        }
      },
      SymptomId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Symptoms'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
   down(queryInterface, Sequelize) {
    return queryInterface.dropTable('DiseaseSymptoms');
  }
};