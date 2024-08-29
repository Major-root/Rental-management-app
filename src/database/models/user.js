"use strict";
const { Model } = require("sequelize");
const { verifyResetToken, resetToken } = require("../../utils/helpers");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      User.hasMany(models.Item, {
        foreignKey: "userId",
        as: "items",
      });
      User.hasMany(models.Booking, {
        foreignKey: "userId",
        as: "bookings",
      });
      User.hasMany(models.BookingItem, {
        foreignKey: "userId",
        as: "bookingItems",
      });
    }

    toJSON() {
      return {
        ...this.get(),
        password: undefined,
        resetToken: undefined,
        resetTokenExpire: undefined,
        verifyEmailToken: undefined,
        verifyEmailTokenExpire: undefined,
      };
    }
  }

  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email address required" },
          notEmpty: { msg: "Email can't be empty" },
          isEmail: { msg: "Invalid email address" },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone number is required" },
          notEmpty: { msg: "Phone number can't be empty" },
          is: {
            args: /^[0-9]{11}$/,
            msg: "Invalid phone number. Phone number must be exactly 11 digits.",
          },
        },
      },
      role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["provider", "admin"],
        defaultValue: "provider",
      },
      resetToken: DataTypes.STRING,
      resetTokenExpire: DataTypes.DATE,
      verifyEmailToken: DataTypes.STRING,
      verifyEmailTokenExpire: DataTypes.DATE,
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      paranoid: true,
    }
  );
  return User;
};
