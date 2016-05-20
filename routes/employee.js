exports.create = function(req, res) {

	var model = req.app.db.model.Employee;

	// console.log(req.body);

	// fill with required data.
	var person = {};
	person.eId = req.body.eId;
	person.username = req.body.username;
	person.password = req.body.password;
	person.permission = req.body.permission;
	person.firstName = req.body.firstName;
	person.lastName = req.body.lastName;
	person.birthDate = new Date(req.body.birthDate);
	person.inaugurationDate = new Date(req.body.inaugurationDate);
	person.leaveDate = new Date(req.body.leaveDate);
	person.male = req.body.male;
	person.tel = req.body.tel;
	person.mobile = req.body.mobile;
	person.address = req.body.address;
	person.positions = req.body.positions.split(' ');
	person.dispatched = req.body.dispatched;

	// console.log(person)

	var employee = new model(person);
	employee.save();

	res.send({
		result: {
			successful: true
		}
	});

	res.end();

};

exports.read = function(req, res) {

	var model = req.app.db.model.Employee;

	var filter = {};

	var payload = req.body;

	if (typeof payload.eId !== "undefined") {
		filter.eId = payload.eId;
	}
	else if (typeof payload.username !== "undefined") {
		filter.username = payload.username;
	}
	else if (typeof payload.password !== "undefined") {
		filter.password = payload.password;
	}
	else if (typeof payload.permission !== "undefined") {
		filter.permission = payload.permission;
	}
	else if (typeof payload.firstName !== "undefined") {
		filter.firstName = payload.firstName;
	}
	else if (typeof payload.lastName !== "undefined") {
		filter.lastName = payload.lastName;
	}
	else if (typeof payload.birthDate !== "undefined") {
		filter.birthDate = payload.birthDate;
	}
	else if (typeof payload.inaugurationDate !== "undefined") {
		filter.inaugurationDate = payload.inaugurationDate;
	}
	else if (typeof payload.leaveDate !== "undefined") {
		filter.leaveDate = payload.leaveDate;
	}
	else if (typeof payload.male !== "undefined") {
		filter.male = payload.male;
	}
	else if (typeof payload.tel !== "undefined") {
		filter.tel = payload.tel;
	}
	else if (typeof payload.address !== "undefined") {
		filter.address = payload.address;
	}
	else if (typeof payload.positions !== "undefined") {
		filter.positions = payload.positions;
	}
	else if (typeof payload.dispatched !== "undefined") {
		filter.dispatched = payload.dispatched;
	}

	//
	// TODO 日後要改用Aggregate來改善查詢速度
	model
		.find(filter)
		// .aggregate([
		// 		{$match}
		// 	])
		.populate('permission', 'comment')
		.populate('positions', 'title')
		// .select('firstName lastName permission positions')
		.exec(function(err, result) {
				// console.log(err);
				res.send({
					result: result
				});
				res.end();
			});

};

exports.update = function(req, res) {

	var model = req.app.db.model.Employee;

	var filter = {};
	filter.eId = req.params.eId;

	var filter2Set = {};
	filter2Set["$set"] = {};

	//
	// TODO 除工號外，先行開放所有欄位進行變更
	//      待日後再行決定要關閉那些欄位的變更限制
	var payload = req.body;
	if (typeof payload.username !== "undefined") {
		filter2Set["$set"].username = payload.username;
	}
	if (typeof payload.password !== "undefined") {
		filter2Set["$set"].password = payload.password;
	}
	if (typeof payload.permission !== "undefined") {
		filter2Set["$set"].permission = payload.permission;
	}
	if (typeof payload.firstName !== "undefined") {
		filter2Set["$set"].firstName = payload.firstName;
	}
	if (typeof payload.lastName !== "undefined") {
		filter2Set["$set"].lastName = payload.lastName;
	}
	if (typeof payload.birthDate !== "undefined") {
		filter2Set["$set"].birthDate = payload.birthDate;
	}
	if (typeof payload.inaugurationDate !== "undefined") {
		filter2Set["$set"].inaugurationDate = payload.inaugurationDate;
	}
	if (typeof payload.leaveDate !== "undefined") {
		filter2Set["$set"].leaveDate = payload.leaveDate;
	}
	if (typeof payload.male !== "undefined") {
		filter2Set["$set"].male = payload.male;
	}
	if (typeof payload.tel !== "undefined") {
		filter2Set["$set"].tel = payload.tel;
	}
	if (typeof payload.address !== "undefined") {
		filter2Set["$set"].address = payload.address;
	}
	if (typeof payload.positions !== "undefined") {
		filter2Set["$set"].positions = payload.positions;
	}
	if (typeof payload.dispatched !== "undefined") {
		filter2Set["$set"].dispatched = payload.dispatched;
	}

	model
		.update(filter, filter2Set)
		.exec(function(err, nModified) {
			if (err) {
				res.send({
					result: {
						successful: false
					}
				});
			} else {
				res.send({
					successful: true,
					nModified: nModified
				});
			}

			res.end();
		});
};

exports.delete = function(req, res) {

	var id = req.params.eId; 	// 以工號作為刪除的篩選條件
	var model = req.app.db.model.Employee;

	model.remove({eId: id});

	res.send({
		successful: true
	});
	res.end();


};
