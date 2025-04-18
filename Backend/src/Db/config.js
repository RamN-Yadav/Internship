const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect("mongodb://localhost/AdminDatabase");
  console.log("database is connected");
};

module.exports = connectDb;