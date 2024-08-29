"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      bookingId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      clientName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      clientPhone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "client Phone number is required" },
          notEmpty: { msg: "client Phone number can't be empty" },
          is: {
            args: /^[0-9]{11}$/,
            msg: "Invalid phone number. Phone number must be exactly 11 digits.",
          },
        },
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      downPayment: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isInt: { msg: "Please provide a postive real number or integer" },
          min: 0,
        },
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: "pending",
        values: ["pending", "confirmed", "delivered", "canceled"],
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bookings");
  },
};
