const { instance } = require("../../app");
const crypto = require("crypto");
const ErrorHandler = require("../../utils/ErrorHandler");
const paymentModel = require("../../model/paymentModel");

exports.checkoutt = async (req, res, next) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    // console.log(order);
    res.status(200).json({
      order,
    });
  } catch (error) {
    console.log("checkout", error);
  }
};

exports.getApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      key: process.env.RAZORPAY_ID,
    });
  } catch (error) {
    res.json(error.message);
  }
};
exports.paymentVerification = async (req, res, next) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    name,
    email,
  } = req.body;

  // Generate the expected signature using the Razorpay secret key
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  // Compare the generated signature with the signature from the request
  if (generated_signature === razorpay_signature) {
    // Payment is successful
    try {
      // Save payment details to your database
      const payment = await paymentModel.create({
        name,
        email,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        PaymentStatus: true,
      });
      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Payment successful",
        paymentId: razorpay_payment_id,
      });
    } catch (error) {
      console.error("Error saving payment:", error);
      // Return an error response
      return res.status(500).json({
        success: false,
        message: "Error saving payment",
      });
    }
  } else {
    // Signature verification failed
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }
};

exports.checkPayment = async (req, res, next) => {
  try {
    console.log("elo");
    const { email } = req.query;
    console.log(email);
    const data = await paymentModel.findById({
      email,
    });
    if (!data) {
      return res.json({
        success: false,
        message: "Payment not done yet",
      });
    }
    res.json({
      success: true,
      payment: data,
      message: "Payment done successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Error while payment", 404));
  }
};
