const express = require("express");
const errorMiddlewear = require("./middlewires/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require("./config/database");
dotenv.config();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
connectdb();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const Razorpay = require("razorpay");
// console.log(process.env.RAZORPAY_ID);
exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
const payment = require("./routes/payment_routes/payment");
app.use(payment);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use(errorMiddlewear);
