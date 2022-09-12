const httpGet = require('../utility/httpRequest.js').httpGet;
const cf = require('../config/api-url');

async  function shoppeGetSearchHint(req){
  try {
    var data = await httpGet(
      cf.apiShopeeProduct,
      {params:{
        "by":"relevancy",
        "keyword":req.query.key,
        "limit":"20",
        "newest":"0",
        "order":"desc"
      }}
    );
    return data.items.map( p =>({
      itemid: p.item_basic.itemid,
      source_type: 'shoppe',
      shopid : p.shopid,
      name: p.item_basic.name, 
      image: p.item_basic.image,
      price: p.item_basic.price,
      price_min: p.item_basic.price_min,
      price_max: p.item_basic.price_max,
      shop_location: p.item_basic.shop_location

    }))
  } catch (error) {
    console.log(error);
  }
    
}

module.exports = {
    get: async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const ret = await shoppeGetSearchHint(req);
        res.json(ret);
      }
}

