const { celebrate, Joi, Segments } = require("celebrate");

class CatMiddleware {
  create = () =>
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().trim().label("name"),
      }),
    });
}

exports.inputs = new CatMiddleware();
