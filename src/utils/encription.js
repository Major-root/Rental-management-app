const bcrypt = require("bcryptjs");

exports.hashInput = async (data) => {
  try {
    const hashed = await bcrypt.hash(data, 12);
    return hashed;
  } catch (error) {
    throw error;
  }
};

exports.verifyInput = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};