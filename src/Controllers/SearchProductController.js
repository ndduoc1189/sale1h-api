'use strict'
const axios = require('axios').default

async  function shoppeGetSearchHint(req){
    var url = 'https://shopee.vn/api/v4/search/search_items?by=relevancy&keyword='+req.query.key+'&limit=20&newest=20&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2';
    var uriDecode = encodeURI(url);
    var res = await axios.get(uriDecode);
    return res.data.items.map( p =>({
      itemid: p.item_basic.itemid,
      source_type: 'shoppe',
      name: p.item_basic.name, 
      image: p.item_basic.image,
      price: p.item_basic.price,
      price_min: p.item_basic.price_min,
      price_max: p.item_basic.price_max,
      shop_location: p.item_basic.shop_location

    }))
}

module.exports = {
    get: async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const ret = await shoppeGetSearchHint(req);
        res.json(ret);
      }
}

