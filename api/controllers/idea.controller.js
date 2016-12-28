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