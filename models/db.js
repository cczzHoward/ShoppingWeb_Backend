const mongoose = require("mongoose");

const connConfig = "mongodb://localhost:27017/ShoppingWebDB";
const conn = mongoose.createConnection(connConfig);

conn.on("connected", () => {
  console.log("Connected to MongoDB");
});
