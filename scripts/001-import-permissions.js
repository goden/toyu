{

	var permissions = [{
		level: 0,
		comment: "無系統使用權限"
	}, {
		level: 1,
		comment: "只具閱讀權限"
	}, {
		level: 2,
		comment: "具有讀寫權限"
	}, {
		level: 3,
		comment: "最高權限"
	}];

	var db = connect("localhost/toyu");
	db.permissions.save(permissions);

	print("001-import-permission-levels finished.");
}