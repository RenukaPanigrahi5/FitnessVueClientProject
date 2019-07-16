const Trainer = require('../model/trainerModel');
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
exports.getTrainerDetailsByName = function (req, res) {
    const trainer_name = req.body.trainer_name;
    Trainer.getTrainerDetailsByTrainerName(trainer_name, (err, trainer) => {
        if (err) throw err;
        if (isEmptyObject(trainer)) {
            return res.json({ success: true, msg: 'No Trainer For the user' + trainer_name });
        } else {
            res.json({
                success: true,
                trainer_name: trainer.trainer_name,
                no_of_user_assigned: trainer.no_of_user_assigned,
                status: trainer.status
            });
        }
    });
};

exports.addNewTrainer = function (req, res) {
    let newTrainer = new Trainer(req.body);
    Trainer.addNewTrainer(newTrainer, (err, trainer) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add new Trainer' });
        } else {
            res.json({ success: true, msg: 'Trainer added successfully' });
        }
    });
};

exports.listAllTrainers = function (req, res) {

    Trainer.getAllTrainers(req, (err, trainers) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add listall Trainer' });
        } else {
            res.json(trainers);
        }
    });
};

exports.updateTrainerDetails = function (req, res) {
    let newTrainer = new Trainer(req.body);
    Trainer.updateTrainerDetails(newTrainer, (err, trainer) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add update Trainer' +err });
        } else {
            res.json({
                success: true,
                msg: 'Trainer updated successfully'
            });
        }
    });
};

exports.isTrainerNameExists = function (req, res) {
const trainer_name = req.body.trainer_name;
Trainer.getTrainerDetailsByTrainerName(trainer_name, (err, trainer) => {
    if(err) throw err;
    if(trainer){
        res.json({
            success: true,
            msg: 'Trainer already exists with trainer_name=' +trainer.trainer_name
        });
    }else{
        res.json({
            success: true,
            msg: 'No trainer exists with trainer_name=' +trainer_name
        });
    }
});
};

exports.removeTrainerDetails = function(req, res){
    Trainer.removeTrainerDetails(req.body.trainer_name, (err, trainer) => {
        if(err){
            res.json({success: false, msg: 'Failed to remove trainer' +err});
        } else{
            res.json({success: true, msg: 'Trainer removed successfully'});
        }    
    });
};
