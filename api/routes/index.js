var express = require('express');
var router = express.Router();

var ctrlIdea = require('../controllers/idea.controller.js');



router 
	.route('/idea')
	.get(ctrlIdea.getIdeas);


module.exports = router;