const router = require("express").Router();
const itemQuery = require("../../service/items/itemQuery");
const guard = require("../../middleware/guard");
const { inputs } = require("../../middleware/itemMiddleware");
const catchAsync = require("../../utils/catchAsync");
const response = require("../../utils/response");

router.use(guard.protect);
router.post(
  "/",
  inputs.create(),
  catchAsync(async (req, res, next) => {
    const data = await itemQuery.createItems(req, next);
    response.success(res, "successfully added rental items", data);
  })
);

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const result = await itemQuery.getAllItems(req, next);
    response.success(res, "Fetched all the user items", result);
  })
);

router.get(
  "/:itemId",
  catchAsync(async (req, res, next) => {
    const result = await itemQuery.getOneItem(req, next);
    response.success(res, "Fetched item details", result);
  })
);

router.patch(
  "/:itemId",
  inputs.update(),
  catchAsync(async (req, res, next) => {
    const result = await itemQuery.updateItem(req, next);
    response.success(res, "Item successfully updated", result);
  })
);

router.delete(
  "/:itemId",
  catchAsync(async (req, res, next) => {
    await itemQuery.deleteItem(req, next);
    response.success(res, "item successfully deleted");
  })
);

module.exports = router;
