const router = require("express").Router();
const catchAsync = require("../../utils/catchAsync");
const bookingQuery = require("../../service/booking/bookingQuery");
const response = require("../../utils/response");
const { inputs } = require("../../middleware/bookingMiddleware");
const guard = require("../../middleware/guard");

const sheduleLogic = require("../../utils/schedular");

router.use(guard.protect);

router.get(
  "/shedule",
  catchAsync(async (req, res, next) => {
    const result = await sheduleLogic.schedulingLogic();
    response.success(res, "schedule fetched", result);
  })
);

router.post(
  "/create-booking",
  inputs.create(),
  catchAsync(async (req, res, next) => {
    const result = await bookingQuery.createBooking(req, next);
    response.success(res, "Items booked successfully", result);
  })
);

router.patch(
  "/confirm/:bookingId",
  inputs.confirm(),
  catchAsync(async (req, res, next) => {
    const result = await bookingQuery.confirmBooking(req);
    response.success(res, "Booking confirmed", result);
  })
);

router.get(
  "/",
  inputs.fetchBookings(),
  catchAsync(async (req, res, next) => {
    const result = await bookingQuery.getAllBookings(req);
    response.success(res, "Bookings successfully fetched", result);
  })
);
router.get(
  "/check-availability",
  inputs.available(),
  catchAsync(async (req, res, next) => {
    const result = await bookingQuery.getAllAvailableItems(req);
    response.success(res, "All availble items fetched", result);
  })
);

router.get(
  "/:bookingId",
  inputs.fetchBooking(),
  catchAsync(async (req, res, next) => {
    const result = await bookingQuery.fetchBooking(req);
    response.success(res, "Booking successfully fetched", result);
  })
);

router.patch(
  "/:bookingId",
  inputs.update(),
  catchAsync(async (req, res, next) => {
    const result = await bookingQuery.updateBooking(req);
    response.success(res, "Booking successfully updated", result);
  })
);

router.get(
  "/item-supplied",
  inputs.fetchItemAccrossTime(),
  catchAsync(async (req, res, next) => {
    const result = await bookingQuery.itemsSuppliedOverTime(req);
    response.success(res, "Retrived booking across time", result);
  })
);
module.exports = router;
