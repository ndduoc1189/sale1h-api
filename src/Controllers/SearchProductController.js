import config from "../config/index.js";
import productServices  from '../services/productServices.js';

const  SearchProductController ={
    get: async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const params={
          by: req.query.by,
          key:req.query.key
        }

        let datas =[];
        await Promise.all( config.productSources.map( async (item)=>{
          const  data = await productServices[item+'Products'](params);
          datas =[...datas,...data]
        }))
        
        const ret = datas.sort(productServices.sortCompare);
        res.json(ret);
      }
}

export default SearchProductController
