const { Booking, User } = require("../database/models");
const { Op } = require("sequelize");
const Email = require("./email");

exports.schedulingLogic = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrowStart = new Date(today);
    tomorrowStart.setDate(today.getDate() + 1);

    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setHours(23, 59, 59, 999);

    const bookings = await Booking.findAll({
      where: {
        startDate: {
          [Op.gte]: tomorrowStart,
          [Op.lte]: tomorrowEnd,
        },
        status: "confirmed",
      },
    });

    if (bookings.length === 0) {
      console.log("No bookings found for tomorrow.");
      return;
    }

    console.log(`Found ${bookings.length} bookings for tomorrow.`);

    await Promise.all(
      bookings.map(async (booking) => {
        try {
          const user = await User.findByPk(booking.userId);
          console.log(user);
          await new Email(user, booking).sendReminderEmail();
        } catch (err) {
          console.error(
            `Failed to send email for booking ID ${booking.bookingId}:`,
            err
          );
        }
      })
    );

    return bookings;
  } catch (err) {
    console.error("An error occurred in schedulingLogic:", err);
    throw err;
  }
};
