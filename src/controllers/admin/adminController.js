const router = require("express").Router();
const { admin } = require("../../service/admin/adminService");
const catchAsync = require("../../utils/catchAsync");
const response = require("../../utils/response");

router.get(
  "/total-users",
  catchAsync(async (req, res, next) => {
    const result = await admin.countAllVerifieUsers(req);
    response.success(res, "fetched total number of users", result);
  })
);

module.exports = router;
