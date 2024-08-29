"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          categoryId: uuidv4(),
          name: "canopy",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          categoryId: uuidv4(),
          name: "chairs",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          categoryId: uuidv4(),
          name: "tables",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          categoryId: uuidv4(),
          name: "chillers",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          categoryId: uuidv4(),
          name: "tent",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
