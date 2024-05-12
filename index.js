const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

app.use("/getorders", require("./routes/getorders"));
app.use("/allorder", require("./routes/allorder"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../foodordering/build"));
}

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
