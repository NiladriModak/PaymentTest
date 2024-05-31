const express = require("express");
const {
  makePayment,
  getApiKey,
  paymentVerification,
  checkoutt,
  checkPayment,
} = require("../../controllers/payment_controllers/payment");
const router = express.Router();
router.route("/payment").post(checkoutt);
router.route("/getRazorKey").get(getApiKey);
router.route("/paymentVerification").post(paymentVerification);
router.route("/checkPayment").get(checkPayment);
module.exports = router;
