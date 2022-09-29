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
          "limit": params.limit || 10,
          "newest": ((params.page || 1)-1)*10,
          "order": "desc"
        },
        headers:{
          ...config.requestHeader,
          'origin': 'https://shopee.vn/',
          'referer':'https://shopee.vn/'
        }
      }
    );
    return data.items.map((p, index) => ({
      itemid: p.item_basic.itemid,
      source_type: 'shopee',
      shopid: p.shopid,
      name: p.item_basic.name,
      image: 'https://cf.shopee.vn/file/' + p.item_basic.image,
      price: p.item_basic.price,
      price_before_discount: p.item_basic.price_before_discount,
      historical_sold: p.item_basic.historical_sold,
      shop_location: p.item_basic.shop_location,
      rating_star: p.item_basic.item_rating.rating_star,
      itemUrl: 'https://shopee.vn/'+encodeURI(p.item_basic.name)+'-i.'+p.shopid+'.'+p.item_basic.itemid,
      sortId: index,
    }));
  },

  tikiProducts: async (params) => {
    const data = await httpGet(
      config.tikiProductAPI,
      {
        params: {
          "q": params.key,
          "limit": params.limit || 10,
          "page": params.page || 1
        },
        headers:{
          ...config.requestHeader,
          'origin': 'https://tiki.vn/',
          'referer':'https://tiki.vn/'
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
      shop_location: 'Trong nước',
      rating_star: p.rating_average,
      itemUrl: 'https://tiki.vn/'+encodeURI(p.name)+'-p'+p.id+'.html',
      sortId: index
    }));
  },
  //https://www.lazada.vn/catalog/?_keyori=ss&ajax=true&from=input&isFirstRequest=true&page=1&q=laptop
  lazadaProducts: async (params) => {
    //Lazada chỉ cho lấy 60 1 lần -> phải chia cho 6 page 1 lần



    
    
    const data = await httpGet(
      config.lazadaProductAPI,
      {
        params: {
          "ajax": true,
          "from": "input",
          "q": params.key,
          "limit": params.limit || 10,
          "page": params.page || 1
        },
        headers:{
          ...config.requestHeader,
          'origin': 'https://www.lazada.vn/',
          'referer':'https://www.lazada.vn/'
        }
      }
    );

    return data.mods.listItems.slice(0, 10).map((p, index) => ({
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
      itemUrl:'https:'+p.itemUrl,
      sortId: index
    }));
  },
  //https://searchlist-api.sendo.vn/web/products?q=b%C3%A0n%20ph%C3%ADm%20c%C6%A1&platform=desktop2&page=1&size=60&sortType=rank&search_type=1&app_version=2.28.15
  sendoProducts: async (params) => {
    const data = await httpGet(
      config.sendoProductAPI,
      {
        params: {
          "q": params.key,
          "platform":"desktop",
          "size": params.limit || 10,
          "page": params.page || 1,
          "sortType":"rank",
          "search_type":1
        },
        headers:{
          ...config.requestHeader,
          'origin': 'https://www.sendo.vn',
          'referer':'https://www.sendo.vn/'
        }
      }
    );
    return data.data.map((p, index) => ({
      itemid: p.id,
      source_type: 'sendo',
      shopid: p.shop ?  p.shop.id : 0,
      name: p.name,
      image: p.image,
      price: p.sale_price_min,
      price_before_discount: p.default_price_min,
      historical_sold: p.sold,
      shop_location: p.shop ?  p.shop.ware_house_region_name : 'Việt Nam',
      rating_star: p.rated ?  p.rated.star : 5,
      itemUrl:'https://www.sendo.vn/'+encodeURIComponent(p.name).replace('%20','+')+ '-'+p.id+'.html',
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