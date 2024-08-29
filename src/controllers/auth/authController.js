const authRouter = require("express").Router();
const authQuery = require("../../service/auth/authQuery");
const catchAsync = require("../../utils/catchAsync");
const response = require("../../utils/response");
const { inputs } = require("../../middleware/authMiddleware");
const Email = require("../../utils/email");
const AppError = require("../../utils/appError");

// Try implement OUTH2
// TRY TO IMPLEMENT MULTIPLE LOGIN

authRouter.post(
  "/signup",
  inputs.signUp(),
  catchAsync(async (req, res, next) => {
    const { user, resetToken } = await authQuery.createUser(req, next);
    const verifyURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/verify-email/${resetToken}`;
    await new Email(user, verifyURL).sendVerifyEmail();
    console.log("after sending email");
    const message = "User created successfully. Please verify your email";
    console.log(message);
    response.success(res, message, user, 201);
  })
);

authRouter.patch(
  "/verify-email/:resetToken",
  catchAsync(async (req, res, next) => {
    const data = await authQuery.verifyUser(req, next);
    response.setCookie(res, req, data.accessToken);
    response.success(res, "User successfully verified", data);
  })
);

authRouter.post(
  "/signin",
  inputs.signIn(),
  catchAsync(async (req, res, next) => {
    const { data, resetToken, user } = await authQuery.login(req, next);

    if (resetToken) {
      const verifyURL = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/auth/verify-email/${resetToken}`;
      await new Email(user, verifyURL).sendVerifyEmail();
      return response.forbidden(
        res,
        "Check your email and verify your email address"
      );
    }
    response.setCookie(res, req, data.accessToken);
    response.success(res, "successful signin", data);
  })
);

authRouter.post(
  "/forgot-password",
  inputs.forgetPassword(),
  catchAsync(async (req, res, next) => {
    const { user, resetToken } = await authQuery.forgetPassword(req, next);
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/reset-password/${resetToken}`;
    try {
      await new Email(user, resetURL).sendPasswordReset();
      response.success(res, "email sent successfully");
    } catch (err) {
      authQuery.failEmail(user);
      return next(new AppError("Email sending failed", 500));
    }
  })
);

authRouter.post(
  "/reset-password/:resetToken",
  inputs.resetPassword(),
  catchAsync(async (req, res, next) => {
    const data = await authQuery.resetPassword(req, next);
    response.success(res, "Password changed successfully", data);
  })
);

module.exports = authRouter;
