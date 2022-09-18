'use strict'
import axios from 'axios';

async  function shoppeGetSearchHint(req){
    var url = 'https://shopee.vn/api/v4/search/search_hint?keyword='+req.query.key+'&search_type=0&version=1';
    var uriDecode = encodeURI(url);
    var res = await axios.get(uriDecode);
    return res.data.keywords.map( p =>({id:p.position, keyword: p.keyword }))
}
function asyncWrapper(fn) {
    return (req, res, next) => {
      return Promise.resolve(fn(req))
        .then((result) => res.send(result))
        .catch((err) => next(err))
    }
  }

const SearchHintController = {
    get: async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const ret = await shoppeGetSearchHint(req);
        res.json(ret);
      }
}

export default SearchHintController

