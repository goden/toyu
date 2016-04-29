var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('shots', { 
  		title: '所有的出車表',
  		message: '/'
  	});
});

router.get('/list', function(req, res, next) {
  	res.render('shots', { 
  		title: '所有的出車表',
  		message: '/list'
  	});
});

router.get('/test', function(req, res, next) {

	// 對資料庫進行連線
	MongoClient.connect('mongodb://127.0.0.1:27017/toyu', function(err, db) {

		// 資料庫連結失敗
		if (err) {
			res.render('shots', {
			  	title: '建立資料庫連結',
			  	message: '連結失敗'
			});
			return;
		}

		// var filter = { message: 'done'};
		db.collection("toyu.shots").find().toArray(function(err, data) {

			if (err) {
				res.render('shots', {
				  	title: '讀取資料庫內容',
				  	message: '讀取失敗'
				});
				return;
			}

			res.render('test', {
				title: '讀取資料庫',
				message: '讀取成功',
				data: data
			});

		});

	});

});

module.exports = router;