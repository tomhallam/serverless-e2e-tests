const axios = require('axios');

function _notifySlack(message) {
  return axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: `*FAILURE* ${message}`,
  });
}

function _log(type, message) {
  console.log(`[${new Date()}][${type.toUpperCase()}]`, message);
}

function info(message) {
  return _log('info', message);
}

function success(message) {
  return _log('success', message);
}

async function fail(error) {
  _log('fail', error);
  await _notifySlack(error);
  process.exit(1);
}

module.exports = {
  info,
  success,
  fail,
};
