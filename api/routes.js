'use strict';
module.exports = function(app) {
  var vccCtrl = require('./controllers/VccController');

  // todoList Routes
  app.route('/api/vcc')
    .get(vccCtrl.get);
}