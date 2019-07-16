const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const workoutAndUserController = require('../controllers/workoutAndUserController');

router.post('/addNewWorkout', workoutController.addNewWorkout);
router.get('/getWorkoutCategory', workoutController.getWorkoutByCategory);

router.post('/addWorkoutCategoryToUser', workoutAndUserController.addWorkoutCategoryToUser);
router.get('/getWorkoutCategoryOfUser', workoutAndUserController.getWorkoutCategoryOfUser);
router.get('/getAllworkoutsBySearchedText', workoutController.listWorkoutsByText);
module.exports = router;
