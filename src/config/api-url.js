const apiURL = require("./api-url.json");

var config = {
    apiShopeeProduct : apiURL.shopee+'search/search_items',
    apiTikiProduct : apiURL.tiki+'/product',
}
module.exports = config;