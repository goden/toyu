exports.create = function(req, res) {

	var model  = req.app.db.model.Client;

	var client = {};
	client.cId = req.body.cId;
 	client.name = req.body.name;
  	client.owner = req.body.owner;
	client.ownerTitle = req.body.ownerTitle;
  	client.zip = req.body.zip;
	client.city = req.body.city;
	client.address = req.body.address;
  	client.tels = req.body.tels;
  	client.faxes = req.body.faxes;
  	client.emails = req.body.emails;
  	client.website = req.body.website;
  	client.taxNumber = req.body.taxNumber;
  	client.comment = req.body.comment;
  	client.payments = req.body.payments;
 	client.accounts = req.body.accounts;

	var data = new model(client);
	console.log(data);
	data.save();

	res.send({
		result: {
			successful: true,
			client: data
		}
	});

	res.end();
};

exports.read = function(req, res) {

	var model = req.app.db.model.Client;

	var filter = {};

	model
		.find(filter)
		.populate('city', 'name')
		.populate('payments', 'comment')
		.exec(function(err, result) {
			res.send({
				result: result
			});
			res.end();
		});
};

exports.update = function(req, res) {
	res.end();
};

exports.delete = function(req, res) {
	res.end();
};