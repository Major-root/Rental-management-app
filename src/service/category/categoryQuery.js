const { Category } = require("../../database/models");

exports.createCategory = async (req, next) => {
  try {
    const cat = Category.create({ name: req.body.name });
    return cat;
  } catch (error) {
    next(error);
  }
};

exports.getAllCategory = async (req, next) => {
  try {
    const categories = Category.findAll();
    return categories;
  } catch (error) {
    next(error);
  }
};
