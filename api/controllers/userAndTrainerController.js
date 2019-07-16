const UserAndTrainer = require('../model/userAndTrainerModel');
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.assignTrainerToUser = function (req, res) {
    let newUserAndTrainer = new UserAndTrainer(req.body);
    UserAndTrainer.addUserAndTrainerEntry(newUserAndTrainer, (err, newUserAndTrainer) => {
        if (err) {
            res.json({success: false, msg: 'Failed to Assign new Trainer' });
        } else {
            res.json({success: true, msg: 'User Assign to trainer successfully'});
        }
        });
};

exports.listAllUserAndTrainer = function (req, res) {
    UserAndTrainer.getAllUserAndTrainer(req, (err, userAndTrainer) => {
        if (err) {
            res.json({success: false, msg: 'Failed to listAllUserAndTrainer' });
        } else {
            res.json(userAndTrainer);
        }
        });
};

exports.updateTrainerOfUser = function (req, res) {
    let newUserAndTrainer = new UserAndTrainer(req.body);
    UserAndTrainer.updateUserTrainerDetails(newUserAndTrainer, (err, trainer) => {
        if (err) {
            res.json({success: false, msg: 'Failed to update trainer of user' +err });
        } else {
            res.json({success: true, msg: 'Trainer updated successfully'});
        }
        });
};


exports.removeUserForTrainer = function (req, res) {
    
    UserAndTrainer.removeUserAndTrainer(req.body.username, (err, trainer) => {
        if (err) {
            res.json({success: false, msg: 'Failed to remove trainer' +err});
        } else {
            res.json({success: true, msg: 'Trainer removed successfully'});
        }
        });
};