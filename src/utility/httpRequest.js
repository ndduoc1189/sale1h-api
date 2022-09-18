import axios from 'axios';

const httpRequest = axios.create({
  timeout: 8000,
  headers:{
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
  }

});

const httpGet = async (path, options = {}) => {
  path = encodeURI(path);
  const response = await httpRequest.get(path, options);
  return response.data;
}

export default httpGet;