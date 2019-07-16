const express = require('express');
const router = express.Router();
const TrainerController = require('../controllers/trainerController');
const UserAndTrainerController = require('../controllers/userAndTrainerController');
// All below 4 are only for admin profile

//Adding new trainer in the fitnessapp
router.post('/addNewTrainer', TrainerController.addNewTrainer);
//whenever admin enters the trainer name this method will be called
//tells that this trainer name already exists 
router.get('/checkTrainerNameExistsAlready', TrainerController.isTrainerNameExists);
//If the trainer leaves then admin can use this method to delete the trainer
router.delete('/removeTrainerByName', TrainerController.removeTrainerDetails);
//whenevr admin assigns the trainer to the user then this one will be called
router.put('/updateTrainerDetails', TrainerController.updateTrainerDetails);
//whenever assigning new user to the trainer admin checks that is the trainer available or not
router.get('/TrainerDetailsByName', TrainerController.getTrainerDetailsByName);

//list all trainers for the users
router.get('/listAllTrainers', TrainerController.listAllTrainers);
//update the trainer for the user if he/she wants to change
router.put('/updateTrainerOfUser', UserAndTrainerController.updateTrainerOfUser);
//assign the trainer to user
router.post('/assignTrainerToUser', UserAndTrainerController.assignTrainerToUser);
//update the user for the trainer
router.get('/displayAllTheTrainerAndUsers', UserAndTrainerController.listAllUserAndTrainer);

router.delete('/removeUserForTrainer', UserAndTrainerController.removeUserForTrainer);



module.exports = router;
