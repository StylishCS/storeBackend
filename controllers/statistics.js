const { Invoice } = require("../models/Invoice");
async function totalSellings(req, res) {
  try {
    let profit = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ]);
    return res.status(200).json(profit);
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function todaysSellings(req, res) {
  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    let profit = await Invoice.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ]);
    return res.status(200).json(profit);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
async function daySellings(req, res) {
  try {
    const request = new Date(req.params.date);
    const today = new Date(request);
    console.log(today);
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    let profit = await Invoice.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ]);
    return res.status(200).json(profit);
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
async function thisMonthSellings(req, res) {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Calculate the start and end dates for the entire month
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1); // Month is zero-indexed in JavaScript Date objects
    const endOfMonth = new Date(currentYear, currentMonth, 0); // Get the last day of the month

    let profit = await Invoice.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ]);

    return res.status(200).json(profit);
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
async function getMonthSellings(req, res) {
  try {
    const today = new Date();
    const currentMonth = req.params.month;
    const currentYear = req.params.year;

    // Calculate the start and end dates for the entire month
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1); // Month is zero-indexed in JavaScript Date objects
    const endOfMonth = new Date(currentYear, currentMonth, 0); // Get the last day of the month
    console.log(startOfMonth);
    console.log(endOfMonth);

    let profit = await Invoice.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ]);

    return res.status(200).json(profit);
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  totalSellings,
  todaysSellings,
  daySellings,
  thisMonthSellings,
  getMonthSellings,
};
