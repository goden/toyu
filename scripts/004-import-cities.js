{
	var cities = [{
		type: 0, 
		name: "台北市"
	}, {
		type: 1,
		name: "新北市"
	}, {
		type: 2,
		name: "基隆市"
	}, {
		type: 3,
		name: "桃園市"
	}, {
		type: 4,
		name: "新竹縣"
	}, {
		type: 5,
		name: "新竹市"
	}, {
		type: 6,
		name: "苗栗縣"
	}, {
		type: 7,
		name: "台中市"
	}, {
		type: 8,
		name: "彰化縣"
	}, {
		type: 9,
		name: "雲林縣"
	}, {
		type: 10,
		name: "嘉義縣"
	}, {
		type: 11,
		name: "嘉義市"
	}, {
		type: 12,
		name: "台南市"
	}, {
		type: 13,
		name: "高雄市"
	}, {
		type: 14,
		name: "屏東縣"
	}, {
		type: 15,
		name: "南投縣"
	}, {
		type: 16,
		name: "宜蘭縣"
	}, {
		type: 17,
		name: "花蓮縣"
	}, {
		type: 18,
		name: "台東縣"
	}, {
		type: 19,
		name: "澎湖縣"
	}];


	var db = connect("localhost/toyu");
	db.cities.save(cities);

	print("003-import-cities finished.");
}