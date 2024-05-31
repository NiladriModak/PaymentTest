const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
  },
  paymentAmount: {
    type: Number,
    default: 0,
  },
  Status: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Payment", paymentSchema);
