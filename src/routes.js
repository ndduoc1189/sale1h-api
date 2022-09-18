import homeCtrl from './Controllers/HomeController.js';
import searchHintCtrl from './Controllers/SearchHintController.js';
import searchProductCtrl from'./Controllers/SearchProductController.js';

export default function(app) {

  app.route('/')
    .get(homeCtrl.get);

  app.route('/search-hint')
    .get(searchHintCtrl.get);

  app.route('/search-product')
    .get(searchProductCtrl.get);

};