var express = require("express");
var router = express.Router();
const {
  totalSellings,
  todaysSellings,
  daySellings,
  thisMonthSellings,
  getMonthSellings,
} = require("../controllers/statistics");
const auth = require("../middlewares/protect");

router.use(auth);

router.get("/profit", totalSellings);
router.get("/day", todaysSellings);
router.get("/day/:date", daySellings);
router.get("/month", thisMonthSellings);
router.get("/month/:year/:month", getMonthSellings);
module.exports = router;
