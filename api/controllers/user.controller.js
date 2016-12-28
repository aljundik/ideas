var mongoose = require ('mongoose');
var User = mongoose.model('User');

module.exports.registerUser = function(req,res){

	console.log("We are Inside registerUser controller");

	User
		.create({
			userName: req.body.userName,
			userUserName: req.body.userUserName,
			userPassword: req.body.userPassword,
			userEmail: req.body.userEmail
		},function(err, user){

			if(err){
				console.log("Error Creating user");
				res
					.status(400)
					.json(err);
			} else {
				console.log("user Created", user);
				res
					.status(201)
					.json(user);
			}
		});
};


module.exports.getUser = function(req,res){
	console.log("we are inside getUser")
	User
		.find()
		.exec(function(err,user){ 

			if(err) {
				console.log("Error finding user");
				res
				.status(500)
				.json(err);
			} else{
				console.log("found user", user.length);
				res
				.json(user);
			}
		});

};

module.exports.getOneUser = function(req,res){
	var userId = req.params.userId;// req parameters handles the url partamters 

	User
	.findById(userId)
	.exec (function(err,doc){
		var response = {
			status : 200,
			message : doc
		};
		if(err) {
			console.log("Error finding user");
			response.status = 500;
			response.message = err;
		} else if (!doc){
			response.status = 404;
				response.message = {
					"message" : "user ID not found"
				};
		}
		res
		.status(response.status)
		.json(response.message);
		
	});
	console.log("get userId", userId);
};

module.exports.editUser = function(req,res){

	var userId = req.params.userId;// req parameters handles the url partamters 

	User
	.findById(userId)
	.exec (function(err,doc){
		var response = {
			status : 200,
			message : doc
		};
		if(err) {
			console.log("Error finding organize");
			response.status = 500;
			response.message = err;
		} else if (!doc){
			response.status = 404;
				response.message = {
					"message" : "User ID not found"
				};
		}
		if (response.status !==200){
			res
				.status(response.status)
				.json(response.message);
			} else {
				doc.userName = req.body.userName;
				doc.userUserName = req.body.userUserName;
				doc.userEmail = req.body.userEmail;
				doc.userPassword = req.body.userPassword;

				doc.save(function(err,userUpdated){
					if (err) {
						res
							.status(500)
							.json(err);
					}else{
						res
							.status(204)
							.json(response.message);
					}
				});
			}


		});	
}

module.exports.deleteUser = function(req,res){

	var userId = req.params.userId;// req parameters handles the url partamters

	User
		.findByIdAndRemove(userId)
		.exec(function(err,user){

			if (err) {
				res
					.status(404)
					.json(err);
			} else{
				console.log("user deleted , id: " , userId);
				res
					.status(204)
					.json();
			}

		});
};