'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Bootcamps', 'BootcampDetailId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'BootcampDetails',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Bootcamps', 'BootcampDetailId', {});
  }
};
