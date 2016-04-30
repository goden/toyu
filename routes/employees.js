var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('employees', { title: '員工資料表', message: "沒有訊息" });
});

router.get('/list', function(req, res, next) {

	// 對資料庫進行連線
	MongoClient.connect('mongodb://127.0.0.1:27017/toyu', function(err, db) {

		// 資料庫連結失敗
		if (err) {
			res.render('employees', {
			  	title: '建立資料庫連結',
			  	message: '連結失敗'
			});
			return;
		}

		// var filter = { message: 'done'};
		db.collection("toyu.employees").find().toArray(function(err, data) {

			if (err) {
				res.render('employees', {
				  	title: '讀取資料庫內容',
				  	message: '讀取失敗'
				});
				return;
			}

			// res.render('employees', {
			// 	title: '讀取資料庫',
			// 	message: '讀取成功',
			// 	data: data
			// });
			console.log(data);
			res.json(data);
		});

	});

});

				// data: [{
				// 	eId: 1, name: "洪宗義", birthday: "1970/01/01", sex: "男", title: "吊車/吊卡車司機", comment: "老闆"
				// }, {
				// 	eId: 2, name: "鄭家宜", birthday: "1970/01/01", sex: "女", title: "會計", comment: "總務"
				// }]

module.exports = router;