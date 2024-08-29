const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BookingItem extends Model {
    static associate(models) {
      BookingItem.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      BookingItem.belongsTo(models.Booking, {
        foreignKey: "bookingId",
        as: "booking",
      });
      BookingItem.belongsTo(models.Item, {
        foreignKey: "itemId",
        as: "item",
      });
    }

    toJSON() {
      return {
        ...this.get(),
        bookingId: undefined,
        userId: undefined,
        itemId: undefined,
        bookitemId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }

  BookingItem.init(
    {
      bookitemId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Please provide a postive real number or integer" },
          min: 0,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      bookingId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BookingItem",
      tableName: "bookingitems",
      paranoid: true,
    }
  );
  return BookingItem;
};
