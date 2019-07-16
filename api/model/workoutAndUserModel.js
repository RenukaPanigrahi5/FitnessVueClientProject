const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const WorkoutAndUserSchema = mongoose.Schema({
    workoutCategory: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
});

const WorkoutAndUser = module.exports = mongoose.model('WorkoutAndUser', WorkoutAndUserSchema);

module.exports.getWorkoutCategoryOfUser = function(userName, callback){
    const query = {userName: userName}
    WorkoutAndUser.findOne(query, callback);
}

module.exports.addWorkoutCategoryToUser = function(newWorkoutCategoryAndUser, callback){
    newWorkoutCategoryAndUser.save(callback);
}

module.exports.getAllWorkoutCategoryAndUser = function(req, callback){
    WorkoutAndUser.find({}, callback);
}