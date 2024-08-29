const { Model } = require("sequelize");
// const { sequelize } = require('.')

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Booking.hasMany(models.BookingItem, {
        foreignKey: "bookingId",
        as: "bookingItems",
      });
    }
  }

  Booking.init(
    {
      bookingId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientPhone: {
        type: DataTypes.STRING,
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
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: { msg: "Please provide a postive real number or integer" },
          min: 0,
        },
      },
      downPayment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: { msg: "Please provide a postive real number or integer" },
          min: 0,
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: "please provide a valide date" },
          isFuture(value) {
            if (new Date(value) <= new Date()) {
              throw new Error("Please provide a valid future date");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: "please provide a valide date" },
          isFuture(value) {
            if (new Date(value) <= new Date()) {
              throw new Error("Please provide a valid future date");
            }
          },
        },
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        defaultValue: "pending",
        values: ["pending", "confirmed", "deliverd", "canceled"],
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: "bookings",
      paranoid: true,
    }
  );

  return Booking;
};
