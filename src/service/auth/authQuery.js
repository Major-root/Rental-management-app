const { User } = require("../../database/models");
const encript = require("../../utils/encription");
const helper = require("../../utils/helpers");
const AppError = require("../../utils/appError");
const { Op } = require("sequelize");

exports.createUser = async (req, next) => {
  let { firstName, lastName, email, password, phoneNumber } = req.body;
  password = await encript.hashInput(password);
  const { resetToken, hash } = helper.resetToken();
  const verifyEmailTokenExpire = Date.now() + 10 * 60 * 1000;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    verifyEmailToken: hash,
    verifyEmailTokenExpire,
  });
  user.toJSON();
  return { user, resetToken };
};

exports.verifyUser = async (req, next) => {
  const hash = helper.verifyResetToken(req);
  const user = await User.findOne({
    where: {
      verifyEmailToken: hash,
      verifyEmailTokenExpire: {
        [Op.lte]: new Date(),
      },
    },
  });

  if (!user) {
    console.log("no user found");
    return next(new AppError("User doesn't exist or token expired", 400));
  }

  user.verified = true;
  user.verifyEmailToken = null;
  user.verifyEmailTokenExpire = null;
  await user.save();
  user.password = undefined;
  const data = {
    accessToken: helper.signToken(user.userId),
    user,
  };
  return data;
};

exports.login = async (req, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !encript.verifyInput(password, user.password)) {
    return next(new AppError("Invalid email or password", 401));
  }

  // check if a user is verified
  if (!user.verified) {
    const { resetToken, hash } = helper.resetToken();
    user.verifyEmailToken = hash;
    user.verifyEmailTokenExpire = Date.now() + 10 * 60 * 1000;

    await user.save();
    return { resetToken, user: user.toJSON() };
  }

  const data = {
    accessToken: helper.signToken(user.userId),
    user: user.toJSON(),
  };
  return { data };
};

exports.forgetPassword = async (req, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next(new AppError("You don't have an account with us", 400));
  }
  const { resetToken, hash } = helper.resetToken();
  user.resetToken = hash;
  user.resetTokenExpires = Date.now() + 10 * 60 * 1000;

  await user.save({ validationBeforSave: false });

  return { user, resetToken };
};

exports.failEmail = async (user) => {
  user.resetToken = null;
  user.resetTokenExpires = null;

  await user.save({ validationBeforSave: false });
};

exports.resetPassword = async (req, next) => {
  const hash = helper.verifyResetToken(req);

  const user = await User.findOne({
    where: {
      resetPassword: hash,
      resetTokenExpires: {
        [Op.lte]: Date.now(),
      },
    },
  }); // find how to check if the password is expired

  if (!user) {
    return next(new AppError("User doesn't exist or token expired", 400));
  }

  user.password = encript.hashInput(req.password);
  user.resetToken = null;
  user.resetTokenExpires = null;

  await user.save({ validationBeforSave: false });
  // user.password = nu

  const data = {
    accessToken: helper.signToken(user.userId),
    user,
  };
  return data;
};
