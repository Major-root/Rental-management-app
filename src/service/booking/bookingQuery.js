const AppError = require("../../utils/appError");
const {
  Booking,
  BookingItem,
  Item,
  sequelize,
} = require("../../database/models");
const { Op } = require("sequelize");

const existingBookingsQuery = (startDate, endDate) => {
  return {
    status: "confirmed",
    [Op.or]: [
      { startDate: { [Op.between]: [startDate, endDate] } },
      { endDate: { [Op.between]: [startDate, endDate] } },
      {
        startDate: { [Op.lte]: startDate },
        endDate: { [Op.gte]: endDate },
      },
    ],
  };
};

const populateBookedItemsPerDay = (existingBookings, bookedItemsPerDay) => {
  return existingBookings.forEach((booking) => {
    booking.bookingItems.forEach((item) => {
      let currentDate = new Date(booking.startDate);
      while (currentDate <= new Date(booking.endDate)) {
        const dateStr = currentDate.toISOString().split("T")[0];
        if (bookedItemsPerDay[dateStr]) {
          const itemName = item.name;
          if (!bookedItemsPerDay[dateStr][itemName])
            bookedItemsPerDay[dateStr][itemName] = 0;
          bookedItemsPerDay[dateStr][itemName] += item.quantity;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
  });
};

const initializeBookingDays = (startDate, endDate) => {
  const bookedItemsPerDay = {};
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    const dateStr = currentDate.toISOString().split("T")[0]; // Convert date to 'YYYY-MM-DD' format
    bookedItemsPerDay[dateStr] = {};
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return bookedItemsPerDay;
};

const checkAvailability = (
  items,
  bookedItemsPerDay,
  totalItems,
  startDate,
  endDate
) => {
  const totalInventory = totalItems.reduce((acc, item) => {
    acc[item.name] = item.quantity;
    return acc;
  }, {});

  for (const item of items) {
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const bookedQuantity = bookedItemsPerDay[dateStr][item.name] || 0;
      const availableQuantity = totalInventory[item.name] - bookedQuantity;

      if (availableQuantity < item.quantity) {
        return false;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  return true;
};

const totalBill = (totalItem, bookingItem, startDate, endDate) => {
  const findItem = (arr, name) => arr.find((item) => item.name === name);
  const total = bookingItem.reduce((accum, currentvalue) => {
    const sum = findItem(totalItem, currentvalue.name);
    if (!sum) return;
    const price = sum.price;
    const quantity = currentvalue.quantity;
    product = price * quantity;
    return accum + product;
  }, 0);
  const days =
    (new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000) + 1;
  return total * days;
};

exports.createBooking = async (req, next) => {
  const { userId } = req.user;
  const { clientName, clientPhone, location, startDate, endDate, items } =
    req.body;

  const transaction = await sequelize.transaction();
  try {
    const totalItems = await Item.findAll({ where: { userId }, transaction });
    const existingBookings = await Booking.findAll({
      where: {
        status: "confirmed",
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } },
          {
            startDate: { [Op.lte]: startDate },
            endDate: { [Op.gte]: endDate },
          },
        ],
      },
      include: { model: BookingItem, as: "bookingItems" },
      transaction,
    });

    const bookedItemsPerDay = initializeBookingDays(startDate, endDate);

    existingBookings.forEach((booking) => {
      booking.bookingItems.forEach((item) => {
        let currentDate = new Date(booking.startDate);
        while (currentDate <= new Date(booking.endDate)) {
          const dateStr = currentDate.toISOString().split("T")[0];
          if (bookedItemsPerDay[dateStr]) {
            const itemName = item.name;
            if (!bookedItemsPerDay[dateStr][itemName])
              bookedItemsPerDay[dateStr][itemName] = 0;
            bookedItemsPerDay[dateStr][itemName] += item.quantity;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
    });

    const isBookingPossible = checkAvailability(
      items,
      bookedItemsPerDay,
      totalItems,
      startDate,
      endDate
    );

    if (!isBookingPossible)
      throw new AppError(
        "Requested items are not available for the selected date range.",
        400
      );

    const bill = totalBill(totalItems, items, startDate, endDate);
    const booking = await Booking.create(
      {
        clientName: clientName.toLowerCase(),
        clientPhone,
        location,
        startDate,
        endDate,
        userId,
        totalPrice: bill,
      },
      { transaction }
    );

    const itemResult = await Promise.all(
      items.map(async (element) => {
        const item = { ...element, userId, bookingId: booking.bookingId };
        return await BookingItem.create(item, { transaction });
      })
    );
    await transaction.commit();
    // const totalMaterial = { ...booking, bookedItems: itemResult };
    const totalMaterial = {
      ...booking.get({ plain: true }),
      bookedItems: itemResult.map((item) => item.toJSON()),
    };
    return totalMaterial;
  } catch (err) {
    await transaction.rollback();
    // return next(err);
    throw err;
  }
};

exports.confirmBooking = async (req) => {
  try {
    const { downPayment } = req.body;
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);
    booking.downPayment += downPayment;
    booking.status = "confirmed";

    return await booking.save();
  } catch (err) {
    throw err;
  }
};

exports.getAllBookings = async (req) => {
  try {
    console.log(req.query);
    let { page = 1, limit = 10, q, client, location, status } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    status = status.toLowerCase();

    let where = {};

    if (client) where = { ...where, clientName: { [Op.like]: `%${client}%` } };
    if (location)
      where = { ...where, location: { [Op.like]: `%${location}%` } };

    if (status) where = { ...where, status }; // { [Op.like]: `%${status}%` }
    if (q) {
      where = {
        ...where,
        [Op.or]: [
          { clientName: { [Op.like]: `%${q}%` } },
          { location: { [Op.like]: `%${q}%` } },
        ],
      };
    }

    const { count, rows } = await Booking.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
      // include: { model: BookingItem, as: "bookingItems" },
    });

    return {
      total: count,
      page,
      lastPage: Math.ceil(count / limit),
      bookings: rows,
    };
  } catch (error) {
    throw error;
  }
};

exports.fetchBooking = async (req) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findByPk(bookingId, {
      include: {
        model: BookingItem,
        as: "bookingItems",
        attributes: {
          exclude: [
            "userId",
            "bookingId",
            "itemId",
            "deletedAt",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    });
    return booking;
  } catch (error) {
    throw error;
  }
};

exports.updateBooking = async (req) => {
  const { bookingId } = req.params;
  const { items, location, startDate, endDate } = req.body;
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const booking = await Booking.findByPk(bookingId, {
      include: { model: BookingItem, as: "bookingItems" },
    });

    if (location) booking.location = location;

    if (startDate || endDate) {
    }
  } catch (error) {
    throw error;
  }
};

exports.getAllAvailableItems = async (req) => {
  const { startDate, endDate, items } = req.body;
  const { userId } = req.user;
  const totalItems = await bookedItems.findAll({ where: { userId } });
  const itemArray = items ? items.split(",") : [];
  const existingBookings = await Booking.findAll({
    where: existingBookingsQuery(startDate, endDate),
    include: { model: BookingItem, as: "bookingItems" },
  });

  bookedItemsPerDay = initializeBookingDays(startDate, endDate);

  populateBookedItemsPerDay(existingBookings, bookedItemsPerDay);
  // totalItems - bookeditemsperday
  const totalInventory = totalItems.reduce((acc, item) => {
    acc[item.name] = item.quantity;
    return acc;
  }, {});

  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    const dateStr = currentDate.toISOString().split("T")[0];
    itemArray.forEach((item) => {
      const bookedQuantity = bookedItemsPerDay[dateStr][item];
      bookedItemsPerDay[dateStr][item] = totalInventory[item] - bookedQuantity;
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return bookedItemsPerDay;
};
