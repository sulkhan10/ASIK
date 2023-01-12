'use strict';
const fs = require('fs')
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let user = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8')).map(el => {
    let salt = bcrypt.genSaltSync(6)
    let hash = bcrypt.hashSync(el.password, salt)
    el.password = hash
    el.createdAt = el.updatedAt = new Date()
    return el
   })
    return queryInterface.bulkInsert('Users', user, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {})
  }
};