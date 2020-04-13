const http = require('./helpers/http');

async function login({ username, password }) {
  const {
    data: { accessToken },
  } = await http.post('/auth/login', {
    username,
    password,
  });

  return { accessToken };
}

module.exports = {
  login
}