const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require('dotenv').config();

const PORT = process.env.PORT || 5500;

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

// Routes - Node (local)
//app.use("/apiLocDirect", require("./routes/location_direct"));
//app.use("/apiLocReverse", require("./routes/location_reverse"));
//app.use("/apiWeather", require("./routes/weather"));

// Routes - Netlify
app.use("/apiLocDirect", require("./functions/fetch-location/fetch-location"));
app.use("/apiLocReverse", require("./functions/fetch-location-reverse/fetch-location-reverse"));
app.use("/apiWeather", require("./functions/fetch-weather/fetch-weather"));

// Enable cors
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
