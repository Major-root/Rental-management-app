"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.BookingItem, {
        foreignKey: "itemId",
        as: "bookingitems",
      });
      Item.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Item.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "categories",
      });
    }
  }

  Item.init(
    {
      itemId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Item name is required" },
          notEmpty: { msg: "Item name can't be empty" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Please provide a postive real number or integer" },
          min: 0,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Please provide a postive real number or integer" },
          min: 0,
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Item",
      tableName: "items",
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["name", "userId"],
        },
      ],
    }
  );
  return Item;
};
