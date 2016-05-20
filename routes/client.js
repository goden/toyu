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
		// .populate('name')
		// .populate('city', 'name')
		// .populate('city', 'type')
		.populate('payments', 'comment')
		.exec(function(err, result) {
			res.send({
				result: result
			});
			console.log(result);
			res.end();
		});
};

exports.update = function(req, res) {

	// 客戶編號一旦建立，就不容再行更改
	var model = req.app.db.model.Client;

	var filter = {};
	filter.cId = req.params.cId;
	
	var filter2Set = {};
	filter2Set["$set"] = {};

	if (typeof req.body.name !== "undefined") {
		filter2Set["$set"].name=req.body.name;
	}
	if (typeof req.body.owner !== "undefined") {
		filter2Set["$set"].owner=req.body.owner;
	}
	if (typeof req.body.ownerTitle !== "undefined") {
		filter2Set["$set"].ownerTitle=req.body.ownerTitle;
	}
	if (typeof req.body.zip !== "undefined") {
		filter2Set["$set"].zip=req.body.zip;
	}
	if (typeof req.body.city !== "undefined") {
		filter2Set["$set"].city=req.body.city;
	}
	if (typeof req.body.address !== "undefined") {
		filter2Set["$set"].address=req.body.address;
	}
	if (typeof req.body.tels !== "undefined") {
		filter2Set["$set"].tels=req.body.tels;
	}
	if (typeof req.body.emails !== "undefined") {
		filter2Set["$set"].emails=req.body.emails;
	}
	if (typeof req.body.faxes !== "undefined") {
		filter2Set["$set"].faxes=req.body.faxes;
	}
	if (typeof req.body.website !== "undefined") {
		filter2Set["$set"].website=req.body.website;
	}
	if (typeof req.body.taxNumber !== "undefined") {
		filter2Set["$set"].taxNumber=req.body.taxNumber;
	}
	if (typeof req.body.comment !== "undefined") {
		filter2Set["$set"].comment=req.body.comment;
	}
	if (typeof req.body.payments !== "undefined") {
		filter2Set["$set"].payments=req.body.payments;
	}
	if (typeof req.body.accounts !== "undefined") {
		filter2Set["$set"].accounts=req.body.accounts;
	}

	console.log(filter2Set);

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

	var model = req.app.db.model.Client;

	model.remove({cId: req.params.cId});
	res.send({
		result: {
			successful: true
		}
	});
	res.end();
};