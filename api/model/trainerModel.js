const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Trainer Schema
const TrainerSchema = mongoose.Schema({
    trainer_name: {
        type: String,
        required: 'Kindly enter the trainer_name'
    },
    status: {
        type: [{
            type: String,
            enum: ['not available', 'available']
        }],
        default: ['available']

    },
    no_of_user_assigned: {
        type: Number,
        default: 0
    }

});

const Trainer = module.exports = mongoose.model('Trainer', TrainerSchema);
module.exports.addNewTrainer = function(newTrainer, callback)
{
    newTrainer.save(callback);
}
module.exports.getTrainerDetailsByTrainerName = function(trainer_name, callback){
    const query = {trainer_name: trainer_name}
    Trainer.findOne(query, callback);
}
module.exports.getAllTrainers = function(callback)
{
    Trainer.find({}, callback);
}
module.exports.updateTrainerDetails = function(newTrainer, callback)
{
    Trainer.findOneAndUpdate({trainer_name: newTrainer.trainer_name},
    {
        status: newTrainer.status,
        no_of_user_assigned: newTrainer.no_of_user_assigned
    },
callback);
}

module.exports.removeTrainerDetails = function(trainerName,callback)
{
    Trainer.findOneAndRemove({trainer_name: trainerName}, callback);
}