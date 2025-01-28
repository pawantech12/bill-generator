const express = require("express");
const { generateBill } = require("../controllers/billgenerator.controller");
const router = express.Router();

router.route("/generate-bill").post(generateBill);

module.exports = router;
