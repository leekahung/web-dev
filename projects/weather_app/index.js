const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 Minute
  max: 10
})

app.use(limiter);
app.set("trust proxy", 1);

// Set static folder
app.use(express.static("public"));

// Routes
app.use("/apiLoc", require("./routes/location"));
app.use("/apiWeather", require("./routes/weather"));

// Enable cors
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));