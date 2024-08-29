const { Joi, Segments, celebrate } = require("celebrate");

class ItemMiddleware {
  create = () =>
    celebrate({
      [Segments.BODY]: Joi.object({
        items: Joi.array()
          .items(
            Joi.object().keys({
              name: Joi.string().trim().required().label("name"),
              description: Joi.string().optional().label("description"),
              price: Joi.number().required().label("price"),
              quantity: Joi.number().required().label("quantity"),
              categoryId: Joi.string()
                .guid({ version: "uuidv4" })
                .required()
                .label("categoryId"),
            })
          )
          .required(),
      }),
    });
  update = () => {
    return celebrate({
      [Segments.BODY]: Joi.object()
        .keys({
          price: Joi.number().optional().label("price"),
          quantity: Joi.number().optional().label("quantity"),
        })
        .or("price", "quantity"),
    });
  };
}

exports.inputs = new ItemMiddleware();
