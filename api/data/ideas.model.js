var mongoose = require('mongoose');


var ideaSchema = new mongoose.Schema({
	ideaTitle: {
		type : String,
		required: true
	},
	ideaCategory: {
		type : String,
		//required: true
	},
	ideaDescription: {
		type : String,
		//required: true
	},
	ideaCreatedOn: {
		type : Date,
		"default" : Date.now
	}

});

var userSchema = new mongoose.Schema({
	userName: {
		type : String,
		required: true
	},
	userUserName: {
		type : String,
		required: true
	},
	userPassword: {
		type : String,
		required: true
	},
	userEmail: {
		type : String,
		required: true
	},
	userCreatedOn: {
		type : Date,
		"default" : Date.now
	},
	ideas :[ideaSchema]  
	
});

var Idea = mongoose.model('Idea',ideaSchema);
var User = mongoose.model('User',userSchema);