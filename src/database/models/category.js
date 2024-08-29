"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return {
        ...this.get(),
        updatedAt: undefined,
        deletedAt: undefined,
        createdAt: undefined,
      };
    }
  }
  Category.init(
    {
      categoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, unique: true, allowFalse: false },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      paranoid: true,
    }
  );
  return Category;
};
