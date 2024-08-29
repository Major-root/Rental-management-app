'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
      ,
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Email address required' },
          notEmpty: { msg: "Email can't be empty" },
          isEmail: { msg: 'Invalid email address' },
        },
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Phone number is required' },
          notEmpty: { msg: "Phone number can't be empty" },
          is: {
            args: /^[0-9]{11}$/,
            msg: 'Invalid phone number. Phone number must be exactly 11 digits.',
          },
        },
      },
      role: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['provider', 'admin'],
        defaultValue: 'provider',
      },
      resetToken: Sequelize.STRING,
      resetTokenExpire: Sequelize.DATE,
      verifyEmailToken: Sequelize.STRING,
      verifyEmailTokenExpire: Sequelize.DATE,
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
