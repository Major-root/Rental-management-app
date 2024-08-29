const { sequelize } = require('./models');

class AuthDataBase {
  auth = async () => {
    try {
      await sequelize.authenticate();
      console.log('Database authentication was successful.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };

  /**
   * export the sequelize module so that if can be used in any part of the project.
   * this ensures that every connection relating to the database is done within this file and folder.
   */

  module = require('sequelize');
}

exports.dB = new AuthDataBase();
