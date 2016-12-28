var mongoose = require ('mongoose');
var Idea = mongoose.model('Idea');



module.exports.addIdea = function(req,res){

	console.log("We are Inside addIdea controller");

	Idea
		.create({
			ideaTitle: req.body.ideaTitle,
			ideaCategory: req.body.ideaCategory,
			ideaDescription: req.body.ideaDescription
			
			

		},function(err, idea){

			if(err){
				console.log("Error Creating idea");
				res
					.status(400)
					.json(err);
			} else {
				console.log("idea Created", idea);
				res
					.status(201)
					.json(idea);
			}
		});

};


module.exports.getIdea = function(req,res){
	console.log("we are inside getIdea")
	Idea
		.find()
		.exec(function(err,idea){ 

			if(err) {
				console.log("Error finding idea");
				res
				.status(500)
				.json(err);
			} else{
				console.log("found idea", idea.length);
				res
				.json(idea);
			}
		});


};

module.exports.getOneIdea = function(req,res){
	var ideaId = req.params.ideaId;// req parameters handles the url partamters 

	Idea
	.findById(ideaId)
	.exec (function(err,doc){
		var response = {
			status : 200,
			message : doc
		};
		if(err) {
			console.log("Error finding Idea");
			response.status = 500;
			response.message = err;
		} else if (!doc){
			response.status = 404;
				response.message = {
					"message" : "Idea ID not found"
				};
		}
		res
		.status(response.status)
		.json(response.message);
		
	});
	console.log("get ideaId", ideaId);
};

module.exports.editIdea =function(req,res){
	var ideaId = req.params.ideaId;// req parameters handles the url partamters 

	Idea
	.findById(ideaId)
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
					"message" : "Idea ID not found"
				};
		}
		if (response.status !==200){
			res
				.status(response.status)
				.json(response.message);
			} else {
				doc.ideaTitle = req.body.ideaTitle;
				doc.ideaCategory = req.body.ideaCategory;
				doc.ideaDescription = req.body.ideaDescription;

				doc.save(function(err,ideaUpdated){
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


};

module.exports.deleteIdea = function(req,res){
	var ideaId = req.params.ideaId;// req parameters handles the url partamters

	Idea
		.findByIdAndRemove(ideaId)
		.exec(function(err,idea){

			if (err) {
				res
					.status(404)
					.json(err);
			} else{
				console.log("idea deleted , id: " , ideaId);
				res
					.status(204)
					.json();
			}

		});



};