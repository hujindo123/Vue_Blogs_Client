/**
 * Created by Administrator on 2017/10/18.
 */
var express = require('express');
var history = require('connect-history-api-fallback');
var port = process.env.PORT || 8001;
var app = express(); //启动express
var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});
app.use(history({
  rewrites: [
    {from: /\/soccer/, to: '/soccer.html'}
  ]
}));
app.use(router);
app.use(express.static('./dist'));
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listing at http://localhost:' + port + '\n');
})
