var express = require('express');
var router = express.Router();

var ctrlIdea = require('../controllers/idea.controller.js');
var ctrlUser = require('../controllers/user.controller.js');


//idea end points and routes
router 
	.route('/idea')
	.post(ctrlIdea.addIdea)
	.get(ctrlIdea.getIdea);

router
	.route('/idea/:ideaId')
	.get(ctrlIdea.getOneIdea)
	.put(ctrlIdea.editIdea)
	.delete(ctrlIdea.deleteIdea);

//user endpoints

router
	.route('/user')
	.post(ctrlUser.registerUser)
	.get(ctrlUser.getUser);

router
	.route('/user/:userId')
	.get(ctrlUser.getOneUser)
	.put(ctrlUser.editUser)
	.delete(ctrlUser.deleteUser);

router
	.route('/user/:userId/idea')
	.post(ctrlUser.addIdeaToUser);

router
	.route('/user/:userId/idea/:ideaId')
	.get(ctrlUser.getIdeaOfUser)
	.put(ctrlUser.editIdeaOfUser)
	.delete(ctrlUser.deleteIdeaOfUser);


module.exports = router;