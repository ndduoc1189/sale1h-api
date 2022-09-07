'use strict';
module.exports = function(app) {
  let homeCtrl = require('./controllers/HomeController');
  let searchHintCtrl = require('./controllers/SearchHintController');
  let searchProductCtrl = require('./controllers/SearchProductController');
  app.route('/')
    .get(homeCtrl.get);
  
    app.route('/search-hint')
    .get(searchHintCtrl.get);

    app.route('/search-product')
    .get(searchProductCtrl.get);

};