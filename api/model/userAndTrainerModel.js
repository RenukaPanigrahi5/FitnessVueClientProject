const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserAndTrainerSchema = mongoose.Schema({
    trainer_name: {
        type: String,
        required: 'Kindly enter the trainer_name'
    },
    username: {
        type: String,
        required: 'Kindly enter the username'
    }
});

const UserAndTrainer= module.exports = mongoose.model('UserAndTrainer', UserAndTrainerSchema);

module.exports.addUserAndTrainerEntry = function(newUserAndTrainer, callback) {
    newUserAndTrainer.save(callback);
}

module.exports.getAllUserAndTrainer = function(req, callback) {
    UserAndTrainer.find({}, callback)
}
module.exports.updateUserTrainerDetails = function(newUserAndTrainer, callback) {
    UserAndTrainer.findOneAndUpdate({username: newUserAndTrainer.username},
        {trainer_name: newUserAndTrainer.trainer_name}, callback);
}

module.exports.removeUserAndTrainer = function(username, callback) {
    UserAndTrainer.findOneAndRemove({username: username}, callback);
}