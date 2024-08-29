const { Item, Category, sequelize } = require("../../database/models");
const AppError = require("../../utils/appError");

exports.createItems = async (req, next) => {
  const { items } = req.body;
  const { userId } = req.user;

  const transaction = await sequelize.transaction();
  try {
    const data = await Promise.all(
      items.map(async (ele) => {
        const category = await Category.findOne({
          where: { categoryId: ele.categoryId, name: ele.name },
          transaction,
        });
        if (!category) {
          await transaction.rollback();
          return next(
            new AppError(`${ele.name} is not a valid item name`, 400)
          );
        }
        const itemdata = { ...ele, userId };
        const item = await Item.create(itemdata, { transaction });
        return item;
      })
    );

    await transaction.commit();
    return data;
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

exports.getAllItems = async (req, next) => {
  const { userId } = req.user;
  try {
    return await Item.findAll({ where: { userId } });
  } catch (err) {
    next(err);
  }
};

exports.getOneItem = async (req, next) => {
  const { userId } = req.user;
  const { itemId } = req.params;
  try {
    return await Item.findOne({ where: { userId, itemId } });
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, next) => {
  const { itemId } = req.params;
  const { userId } = req.user;
  const { price, quantity } = req.body;
  try {
    const item = await Item.findOne({ where: { userId, itemId } });
    if (!item) {
      return next(new AppError("invalid item detail", 400));
    }
    item.price = price ?? item.price;
    item.quantity = quantity ?? item.quantity;

    return await item.save();
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (req, res, next) => {
  const { userId } = req.user;
  const { itemId } = req.body;
  try {
    await Item.destroy({ where: { userId, itemId } });
    return;
  } catch (err) {
    next(err);
  }
};
