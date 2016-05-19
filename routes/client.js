exports.create = function(req, res) {

	var model  = req.app.db.model.Client;

	var client = {
		cId: req.body.cId,
		name: req.body.name,
		owner: req.body.owner,
		ownerTitle: req.body.ownerTitle,
		zip: req.body.zip,
		address: req.body.address,
		tels: req.body.tels.split(" "),
		faxes: req.body.faxes.split(" "),
		emails: req.body.emails.split(" "),
		website: req.body.website,
		taxNumber: req.body.taxNumber,
		comment: req.body.comment,
		accounts: req.body.accounts.split(" "),
		city: req.body.city,
		payments: req.body.payments.split(" ")
	};

	var c = new model(client);
	// console.log(data);
	c.save();

	res.send({
		result: {
			successful: true,
			client: c
		}
	});

	res.end();
};

exports.read = function(req, res) {

	var model = req.app.db.model.Client;

	var filter = {};

	model
		.find(filter)
		.populate('name')
		// .populate('city', 'name')
		// .populate('payments', 'comment')
		.exec(function(err, result) {
			// res.send({
			// 	result: result
			// });
			console.log(result);
			res.end();
		});
};

exports.update = function(req, res) {
	res.end();
};

exports.delete = function(req, res) {
	res.end();
};