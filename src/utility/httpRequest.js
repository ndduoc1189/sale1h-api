const axios = require('axios').default;

const httpRequest = axios.create({
  timeout: 5000

});

const httpGet = async (path, options = {}) => {
  path = encodeURI(path);
  const response = await httpRequest.get(path, options);
  return response.data;
}

module.exports = { httpGet };