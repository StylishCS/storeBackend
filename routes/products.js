var express = require("express");
var router = express.Router();
const {
  addProduct,
  getProducts,
  getCategories,
  getCatProd,
  checkout,
} = require("../controllers/products");
const auth = require("../middlewares/protect");
const upload = require("../utils/uploadImage");

router.use(auth);

router.get("/all", getProducts);
router.post("/add", upload.single("image"), addProduct);
router.get("/categories", getCategories);
router.get("/categories/:category", getCatProd);
router.post("/checkout", checkout);

module.exports = router;
