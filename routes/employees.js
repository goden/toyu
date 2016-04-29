var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('employees', { title: '員工資料表' });
});

router.get('/list', function(req, res, next) {
  	// res.render('shots', { 
  	// 	title: '列出所有的員工',
  	// 	message: '/list'
  	// });
  	
  	MongoClient.connect("monogodb://127.0.0.1:27017/toyu", function(err, data) {
  		if (err) {
  			res.render("employees", {
  				title: "建立資料庫連結",
  				message: "連結失敗"
  			});
  		}
  		return;
  	});

  	db.collection("toyu.employees").find().toArray(function(err, data) {
		if (err) {
			res.render('employees', {
			  	title: '讀取資料庫內容',
			  	message: '讀取失敗'
			});
			return;
		}

		res.render("employees", {
			title: '讀取資料庫',
			message: '讀取成功',
			data: data
		});

  	});


});

module.exports = router;