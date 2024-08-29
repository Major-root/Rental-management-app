const { celebrate, Joi, Segments } = require("celebrate");

class authMiddleware {
  signUp = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string().required().trim().label("firstName"),
        lastName: Joi.string().required().label("lastName"),
        email: Joi.string().required().min(6).email().trim().label("email"),
        password: Joi.string().required().trim().label("password"),
        // phoneNumber: JoiPhone.string().phoneNumber({ format: 'e164' }),
        phoneNumber: Joi.string().required().trim().label("phoneNumber"),
      }),
    });

  //   sendOtp = () =>
  //     celebrate({
  //       [Segments.BODY]: Joi.object().keys({
  //         email: Joi.string().required().min(6).email().trim().label('email'),
  //       }),
  //     });

  resetPassword = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        // email: Joi.string().required().min(6).email().trim().label('email'),
        password: Joi.string().required().trim().label("password"),
        // otp: Joi.string().required().trim().label('otp'),
      }),
    });

  forgetPassword = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email().trim().label("email"),
      }),
    });

  //   verifyEmail = () =>
  //     celebrate({
  //       [Segments.BODY]: Joi.object().keys({
  //         email: Joi.string().required().min(6).email().trim().label('email'),
  //         otp: Joi.string().required().length(6).label('OTP'),
  //       }),
  //     });

  changePassword = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        oldPassword: Joi.string().required().trim().label("oldPassword"),
        password: Joi.string().required().trim().label("password"),
        otp: Joi.string().required().trim().label("otp"),
      }),
    });

  signIn = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().trim().email().label("email"),
        password: Joi.string().required().trim().label("password"),
      }),
    });

  //   adminSignIn = () =>
  //     celebrate({
  //       [Segments.BODY]: Joi.object().keys({
  //         email: Joi.string().required().min(6).email().trim().label('email'),
  //         password: Joi.string().required().trim().label('password'),
  //       }),
  //     });

  //   switchRole = () =>
  //     celebrate({
  //       [Segments.BODY]: Joi.object().keys({
  //         role: Joi.number().required().min(1).max(3).label('role'),
  //       }),
  //     });

  //   setPin = () =>
  //     celebrate({
  //       [Segments.BODY]: Joi.object().keys({
  //         pin: Joi.string().required().trim().length(4).label('pin'),
  //       }),
  //     });

  //   resetPin = () =>
  //     celebrate({
  //       [Segments.BODY]: Joi.object().keys({
  //         newPin: Joi.string().required().trim().length(4).label('newPin'),
  //         otp: Joi.string().required().trim().length(6).label('otp'),
  //       }),
  //     });
}

exports.inputs = new authMiddleware();
