const { Segments, Joi, celebrate } = require("celebrate");

class BookingMiddleware {
  create = () => {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        clientName: Joi.string().required().label("clientName"),
        clientPhone: Joi.string().required().label("clientPhone"),
        location: Joi.string().required().label("location"),
        startDate: Joi.date().required().label("startDate"),
        endDate: Joi.date().default(Joi.ref("startDate")).label("endDate"),
        items: Joi.array().items(
          Joi.object().keys({
            quantity: Joi.number().required().label("quantity"),
            name: Joi.string().required().label("name"),
            itemId: Joi.string()
              .guid({ version: "uuidv4" })
              .required()
              .label("itemId"),
          })
        ),
      }),
    });
  };

  confirm = () => {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        downPayment: Joi.number().required().label("downPayment"),
      }),

      [Segments.PARAMS]: Joi.object().keys({
        bookingId: Joi.string().uuid().label("bookingId"),
      }),
    });
  };

  fetchBookings() {
    return celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
        status: Joi.string().trim().lowercase().default("confirmed"),
        q: Joi.string().lowercase(),
      }),
    });
  }

  fetchBooking() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        bookingId: Joi.string().uuid().label("bookingId"),
      }),
    });
  }

  update() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        location: Joi.string().label("location"),
        startDate: Joi.date().label("startDate"),
        endDate: Joi.date().label("endDate"),
        items: Joi.array().items(
          Joi.object().keys({
            quantity: Joi.number().required().label("quantity"),
            name: Joi.string().required().label("name"),
            itemId: Joi.string()
              .guid({ version: "uuidv4" })
              .required()
              .label("itemId"),
          })
        ),
      }),
      [Segments.PARAMS]: Joi.object().keys({
        bookingId: Joi.string().uuid().label("bookingId"),
      }),
    });
  }

  available() {
    return celebrate({
      [Segments.QUERY]: Joi.object().keys({
        startDate: Joi.date().required().label("startDate"),
        endDate: Joi.date().default(Joi.ref("startDate")).label("endDate"),
        items: Joi.string().label("items"),
      }),
    });
  }
}

exports.inputs = new BookingMiddleware();
