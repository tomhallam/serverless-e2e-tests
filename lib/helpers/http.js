const axios = require('axios');

const http = axios.default.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
});

module.exports = http;