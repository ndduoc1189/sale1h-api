const apiURL = require("./api-url.json");

var config = {
    apiShopeeProduct : apiURL.shopee+'search/search_items',
    apiTikiProduct : apiURL.tiki+'products',
}
module.exports = config;