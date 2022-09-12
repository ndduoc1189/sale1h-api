'use strict';
module.exports = function(app) {
  let homeCtrl = require('./Controllers/HomeController');
  let searchHintCtrl = require('./Controllers/SearchHintController');
  let searchProductCtrl = require('./Controllers/SearchProductController');
  app.route('/')
    .get(homeCtrl.get);

  app.route('/search-hint')
    .get(searchHintCtrl.get);

  app.route('/search-product')
    .get(searchProductCtrl.get);

};