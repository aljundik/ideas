var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/ideas'; //setup the url to find the db usin the protocols,, somthins simillar to https

mongoose.connect(dburl);

mongoose.connection.on('connected',function(){

	console.log("Mongoose connected to"  + dburl);
});
mongoose.connection.on("disconnected",function(){

	console.log("Mongoose disconnected ");
});
mongoose.connection.on('error',function(err){

	console.log("Mongoose connection error: " + err);
});
process.on("SIGINT", function(){
	mongoose.connection.close(function(){
		console.log("Mongoose disconnected through app termination");
		process.exit(0);
	});
});
process.on("SIGTERM", function(){
	mongoose.connection.close(function(){
		console.log("Mongoose disconnected through app termination");
		process.exit(0);
	});
});
process.once("SIGUSR2", function(){
	mongoose.connection.close(function(){
		console.log("Mongoose disconnected through app termination");
		process.kill(process.pid,'SIGUSR2');
	});
});

// this folder to manage mongoose connection, by handling the different
//kind of event that might occur to dbs connection


// bring in schemas and models

require('./ideas.model.js');// call the models into the db connection
