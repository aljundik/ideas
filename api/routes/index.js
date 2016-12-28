var express = require('express');
var router = express.Router();

var ctrlIdea = require('../controllers/idea.controller.js');



router 
	.route('/idea')
	.post(ctrlIdea.addIdea);


module.exports = router;