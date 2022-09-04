const url = require('url');

const express = require("express");
const router = express.Router();
const needle = require("needle");
const apicache = require("apicache");

// Initalize Cache
let cache = apicache.middleware;

// Environment Variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_GEO_PATH = process.env.API_GEO_PATH;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

router.get("/", cache("2 minutes"), async (request, response) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(request.url, true).query,
    });

    const apiResponse = await needle("get", `${API_BASE_URL}${API_GEO_PATH}${params}`);
    const data = apiResponse.body;
  
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error });
  }

});

module.exports = router;