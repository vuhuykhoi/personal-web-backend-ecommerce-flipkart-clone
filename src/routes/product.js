var express = require("express");
var router = express.Router();
var { requireSignin, adminMiddleware } = require("../common-middleware");
var { createProduct, getProducts } = require("../controllers/product");
var shortid = require("shortid");
var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

var upload = multer({ storage });

router.post(
  "/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);

router.get("/getproduct", getProducts);

module.exports = router;
