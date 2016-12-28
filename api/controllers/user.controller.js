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


var _addIdea = function(req,res,user){

  // add review array to hotel 
  user.ideas.push({
    ideaTitle: req.body.ideaTitle,
	ideaCategory: req.body.ideaCategory,
	ideaDescription: req.body.ideaDescription
    
  });
  user.save(function(err,ideaUpdated){
    if(err){
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(201)
        .json(ideaUpdated.ideas[ideaUpdated.ideas.length -1]);
    }
  });
}

module.exports.addIdeaToUser = function(req,res){
	var userId = req.params.userId;
	

	User
	.findById(userId)
	.select('ideas')
	.exec (function(err,doc){
		var response = {
			status : 200,
			message : []};
			if (err) {
				console.log("Error finding User");
				response.status = 500;
				response.message = err;
			} else if(!doc) {
				console.log("User id not found in database", id);
				response.status = 404;
				response.message = {
					"message" : "User ID not found " + id
				};
			} 
			if (doc){
				_addIdea(req,res,doc);
			} else {
				res
				.status(response.status)
				.json(response.message);
			}
		});
};


module.exports.getIdeaOfUser = function(req,res){
	var userId = req.params.userId;
	var ideaId = req.params.ideaId;

	User
	.findById(userId)
	.select('ideas')
	.exec(function(err, user) {
		var response = {
			status : 200,
			message : {}
		};
		if (err) {
			console.log("Error finding user");
			response.status = 500;
			response.message = err;
		} else if(!user) {
			console.log("user id not found in database", id);
			response.status = 404;
			response.message = {
				"message" : "user ID not found " + id
			};
		} else {
        // Get the idea
        response.message = user.ideas.id(ideaId);
        // If the idea doesn't exist Mongoose returns null
        if (!response.message) {
        	response.status = 404;
        	response.message = {
        		"message" : "Event ID not found " + ideaId
        	};
        }
    }
    res
    .status(response.status)
    .json(response.message);
    });


};


module.exports.editIdeaOfUser = function(req,res){

  var userId = req.params.userId;
  var ideaId = req.params.ideaId;

  User
    .findById(userId)
    .select('ideas')
    .exec(function(err, user) {
      var thisIdea;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding user");
        response.status = 500;
        response.message = err;
      } else if(!user) {
        console.log("user id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "user ID not found " + id
        };
      } else {
        // Get the idea
        thisIdea = user.ideas.id(ideaId);
        // If the idea doesn't exist Mongoose returns null
        if (!thisIdea) {
          response.status = 404;
          response.message = {
            "message" : "Event ID not found " + ideaId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisIdea.ideaTitle = req.body.ideaTitle;
        thisIdea.ideaDescription = req.body.ideaDescription;
        thisIdea.ideaCategory = req.body.ideaCategory;
        
        user.save(function(err, userUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json("Saved");
          }
        });
      }
    });	


};

module.exports.deleteIdeaOfUser = function(req,res){

  var userId = req.params.userId;
  var ideaId = req.params.ideaId;

  User
    .findById(userId)
    .select('ideas')
    .exec(function(err, user) {
      var thisIdea;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding user");
        response.status = 500;
        response.message = err;
      } else if(!user) {
        console.log("user id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "user ID not found " + id
        };
      } else {
        // Get the event
        thisIdea = user.ideas.id(ideaId);
        // If the event doesn't exist Mongoose returns null
        if (!thisIdea) {
          response.status = 404;
          response.message = {
            "message" : "Event ID not found " + ideaId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        user.ideas.id(ideaId).remove();
        user.save(function(err, userUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};