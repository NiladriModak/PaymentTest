const { default: mongoose } = require("mongoose");

const connectdb = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(console.log("data base connected"));
};

module.exports = connectdb;
