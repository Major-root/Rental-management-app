const { User, Booking, Item, BookingItem } = require("../../database/models");

class Admin {
  countAllVerifieUsers = async (req) => {
    const total = await User.count({
      where: { verified: true, role: "provider" },
    });

    return total;
  };

  countAlllBookings = async (req) => {
    const { status } = req.query;
    let where = {};
    if (status) where = { ...where, status };

    const total = await Booking.count({ where });
  };
}

exports.admin = new Admin();
