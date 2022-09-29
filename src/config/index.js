const config = {
  productSources: ["shopee", "tiki", "lazada",'sendo'],
  shoppeProductAPI: "https://shopee.vn/api/v4/search/search_items",
  tikiProductAPI: "https://tiki.vn/api/v2/products",
  lazadaProductAPI: "https://www.lazada.vn/catalog/",
  sendoProductAPI: "https://searchlist-api.sendo.vn/web/products",
  afURL: "https://go.isclix.com/deep_link/4920806040439407239?utm_source=sale1h&url=",
  requestHeader:{
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
    }
  
}
export default config;