const axios = require('axios').default;

const httpRequest = axios.create({
    timeout: 1000,
    headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        'sec-ch-ua':'"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
        'accept-language':'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
        'accept-encoding':'gzip, deflate, br',
        'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    }

});

const httpGet = async (path, options = {}) => {
    path = encodeURI(path);
    const response = await httpRequest.get(path, options);
    return response.data;
}

module.exports  = {httpGet};