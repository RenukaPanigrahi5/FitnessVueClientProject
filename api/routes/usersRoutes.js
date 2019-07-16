const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const friendsController = require('../controllers/friendsController');
const jwtHelper = require('../config/jwtHelper');
//Register
router.post('/register', userController.register);
//if the userNames is already exists warns in advance
router.get('/checkUserExistsAlready', userController.isUserExists);
//authenticating the user while logging by encrypting pwd
router.post('/authenticate', userController.authenticate);
//display users who are using this app, can be used for search their friends
router.get('/displayAllUsers', userController.listAllUsers);
//admin user can delete the user if one terminates
router.delete('/deleteUsers', userController.removeUserDetails);
router.get('/userProfile',jwtHelper.verifyJwtToken, userController.userProfile);
router.put('/changePassword', userController.changePassword);

//add and remove friends 
router.post('/addNewFriend', friendsController.addNewFriend);
router.get('/listAllFriends', friendsController.listAllFriends);
router.delete('/deleteFriend', friendsController.removeFriend);

module.exports = router;
