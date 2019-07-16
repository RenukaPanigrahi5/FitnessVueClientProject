const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const WorkoutSchema = mongoose.Schema({
    workoutName: {
        type: String
    },
    workoutType: {
        type: String,
        required: 'true'
    },
    workoutCategory: {
        type: String,
        required: 'true'
    },
    workoutDay: {
        type: String,
        required: 'true'
    },
    workoutInDetails:{
        type: Array,
        required: 'true'
    }
});
const Workouts = module.exports = mongoose.model('Workouts', WorkoutSchema);

module.exports.getWorkoutCategory = function(workoutCategory, callback) {
    const query = {workoutCategory: workoutCategory}
    Workouts.find(query, callback);
}

module.exports.addNewWorkout = function(newWorkout, callback) {
    newWorkout.save(callback);
}

module.exports.addManyWorkouts = function(newWorkouts, callback){
    Workouts.create(newWorkouts, callback);
}
module.exports.getAllWorkouts = function(callback) {
    Workouts.find({}, callback);
}