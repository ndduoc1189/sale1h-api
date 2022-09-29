import config from "../config/index.js";
import productServices  from '../services/productServices.js';

const  SearchProductController ={
    get: async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const params={
          by: req.query.by,
          key:req.query.key,
          page:req.query.page|1
        }

        let datas =[];

        // call API động theo thiết lập để lấy về dữ liệu. 
        await Promise.all( config.productSources.map( async (item)=>{
          // call API đi lấy dữ liệu trả về 1 array json
          try{
            const  data = await productServices[item+'Products'](params);
            console.log(item +'-- Geting....')
            // Ghép dữliệu vào 1 mảng chung
            datas =[...datas,...data]
            console.log(item +'-- success')
          }catch(err){
            console.log(err);
          }
          
        }))
        
        //sắp xếp lại dữ liệu
        const ret = datas.sort(productServices.sortCompare);
        res.json(ret);
      }
}

export default SearchProductController
