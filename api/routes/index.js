var express = require('express');
var router = express.Router();

var ctrlIdea = require('../controllers/idea.controller.js');



router 
	.route('/idea')
	.post(ctrlIdea.addIdea)
	.get(ctrlIdea.getIdea);

router
	.route('/idea/:ideaId')
	.get(ctrlIdea.getOneIdea)
	.put(ctrlIdea.editIdea)
	.delete(ctrlIdea.deleteIdea);


module.exports = router;