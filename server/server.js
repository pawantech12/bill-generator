require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db.config");

const app = express();
const PORT = process.env.PORT || 5000;

const billGenerateRoute = require("./routes/billgenerator.route");

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api", billGenerateRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
});
