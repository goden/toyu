{
	
	var payments = [{
		type: 0, 
		comment: "現金"
	}, {
		type: 1,
		comment: "支票"
	}, {
		type: 2,
		comment: "匯款"
	}, {
		type: 3,
		comment: "電匯"
	}];


	var db = connect("localhost/toyu");
	db.payments.save(payments);

	print("003-import-payments finished.");
}