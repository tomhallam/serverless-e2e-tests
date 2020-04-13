'use strict';

const http = require('./lib/helpers/http');
const { info, success, fail } = require('./lib/helpers/log');
const { login } = require('./lib/auth');

let consumerAccessToken;

module.exports.e2e = async (event) => {
  info('Starting E2E test run...');

  // CONSUMER LOGIN -----------------------------------------------
  try {
    info('Login as consumer...');
    const { accessToken } = await login({
      username: process.env.E2E_USERNAME,
      password: process.env.E2E_PASSWORD,
    });

    consumerAccessToken = accessToken;

    success('Got consumer access token!');
  } catch (error) {
    await fail(`Unable to log in as consumer: ${error.message}`);
  }

  // GET ACCOUNT DATA ----------------------------------------------
  try {
    info('Getting account data...');
    const { data: account } = await http.get('/account', {
      headers: {
        Authorization: `Bearer ${consumerAccessToken}`,
      },
    });

    success('Got account data!');

    if (Number(account.widgets) === 0) {
      await fail('Consumer has no widgets!');
    }

    success(`Consumer has ${account.widgets} widgets available`);
  } catch (error) {
    await fail(`Unable to get account data: ${error.message}`);
  }

  return {
    result: 'success',
  };
};
