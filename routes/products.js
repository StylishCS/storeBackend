var express = require("express");
var router = express.Router();
const {
  addProduct,
  getProducts,
  getCategories,
  getCatProd,
  checkout,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products");
const auth = require("../middlewares/protect");
const upload = require("../utils/uploadImage");

router.use(auth);

router.get("/all", getProducts);
router.get("/product/:id", getProduct);
router.post("/add", upload.single("image"), addProduct);
router.get("/categories", getCategories);
router.get("/categories/:category", getCatProd);
router.post("/checkout", checkout);
router.delete("/delete/:id", deleteProduct);
router.patch("/update/:id", updateProduct);

module.exports = router;
