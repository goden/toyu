{

	var positions = [{
		type: 0, 
		title: "助手"
	},{
		type: 1,
		title: "育成吊卡司機"
	}, {
		type: 2,
		title: "育成吊車司機"
	},{
		type: 3,
		title: "吊卡司機"
	}, {
		type: 4,
		title: "吊車司機"
	}, {
		type: 5,
		title: "會計"
	}, {
		type: 6,
		title: "工讀生"
	}, {
		type: 7,
		title: "高空作業車司機"
	}, {
		type: 8,
		title: "堆高機司機"
	}];

	var db = connect("localhost/toyu");
	db.positions.save(positions);

	print("002-import-positions finished.");
}