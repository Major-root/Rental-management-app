const router = require("express").Router();
const catQuery = require("../../service/category/categoryQuery");
const { inputs } = require("../../middleware/categoryMiddleware");
const catchAsync = require("../../utils/catchAsync");
const response = require("../../utils/response");
const guard = require("../../middleware/guard");

router.use(guard.protect);
router.post(
  "/",
  guard.restrictTo("admin"),
  inputs.create(),
  catchAsync(async (req, res, next) => {
    const data = await catQuery.createCategory(req, next);
    response.success(res, "created a new category", data);
  })
);

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const data = await catQuery.getAllCategory(req, next);
    response.success(res, "fetched all the categories", data);
  })
);

module.exports = router;
