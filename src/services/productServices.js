import httpGet from "../utility/httpRequest.js";
import config from "../config/index.js";
/*
params = { key, by
*/

const productServices = {
  //Lấy danh sách sản phẩm từ shopee.vn/
  shopeeProducts: async (params) => {
    const data = await httpGet(
      config.shoppeProductAPI,
      {
        params: {
          "by": params.by,
          "keyword": params.key,
          "limit": "20",
          "newest": "0",
          "order": "desc"
        }
      }
    );
    return data.items.map((p, index) => ({
      itemid: p.item_basic.itemid,
      source_type: 'shoppe',
      shopid: p.shopid,
      name: p.item_basic.name,
      image: 'https://cf.shopee.vn/file/' + p.item_basic.image,
      price: p.item_basic.price,
      price_before_discount: p.item_basic.price_before_discount,
      historical_sold: p.item_basic.historical_sold,
      shop_location: p.item_basic.shop_location,
      rating_star: p.item_basic.item_rating.rating_star,
      sortId: index,
    }));
  },

  tikiProducts: async (params) => {
    const data = await httpGet(
      config.tikiProductAPI,
      {
        params: {
          "q": params.key,
          "limit": params.limit || 20,
          "page": params.page || 1
        }
      }
    );
    return data.data.map((p, index) => ({
      itemid: p.id,
      source_type: 'tiki',
      shopid: p.brand_id,
      name: p.name,
      image: p.thumbnail_url,
      price: p.price,
      price_before_discount: p.original_price,
      historical_sold: p.quantity_sold ? p.quantity_sold.value : 0,
      shop_location: '',
      rating_star: p.rating_average,
      sortId: index
    }));
  },
  //https://www.lazada.vn/catalog/?_keyori=ss&ajax=true&from=input&isFirstRequest=true&page=1&q=laptop
  lazadaProducts: async (params) => {
    const data = await httpGet(
      config.lazadaProductAPI,
      {
        params: {
          "ajax": true,
          "from": "input",
          "q": params.key,
          "limit": params.limit || 20,
          "page": params.page || 1
        }
      }
    );
    return data.mods.listItems.map((p, index) => ({
      itemid: p.itemId,
      source_type: 'lazada',
      shopid: p.sellerId,
      name: p.name,
      image: p.image,
      price: p.price,
      price_before_discount: p.originalPrice,
      historical_sold: 0,
      shop_location: p.location,
      rating_star: p.ratingScore,
      sortId: index
    }));
  },
  sortCompare: (a, b) => {
    if (a.sortId < b.sortId) {
      return -1;
    }
    if (a.sortId > b.sortId) {
      return 1;
    }
    return 0;
  }
};
export default productServices