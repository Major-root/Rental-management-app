const authRouter = require("./src/controllers/auth/authController");
const catRouter = require("./src/controllers/category/categoryController");
const itemRouter = require("./src/controllers/items/itemController");
const bookingRouter = require("./src/controllers/booking/bookingController");

const apiPrefix = "/api/v1";

const routes = [
  { route: authRouter, prefix: "/auth" },
  { route: catRouter, prefix: "/category" },
  { route: itemRouter, prefix: "/item" },
  { route: bookingRouter, prefix: "/booking" },
];

module.exports = (app) => {
  routes.forEach((element) => {
    app.use(`${apiPrefix}${element.prefix}`, element.route);
  });

  return app;
};
