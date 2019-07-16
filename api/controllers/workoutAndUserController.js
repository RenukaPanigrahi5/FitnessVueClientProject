const WorkoutAndUser = require('../model/workoutAndUserModel');
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.getWorkoutCategoryOfUser = function (req, res) {
    const userName = req.body.userName;
    WorkoutAndUser.getWorkoutCategoryOfUser(userName, (err, workoutCategory) => {
        if (err) throw err;
        if (isEmptyObject(workoutCategory)) {
            return res.json({ success: true, msg: 'workoutCategory not found for the user' + userName });
        } else {
            res.json({
                success: true,
                workoutCategory: workoutCategory.workoutCategory
            });
        }
    });
};

exports.addWorkoutCategoryToUser = function (req, res) {
    let newWorkoutAndUser = new WorkoutAndUser(req.body);
    WorkoutAndUser.addWorkoutCategoryToUser(newWorkoutAndUser, (err, newWorkoutAndUser) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to addWorkoutCategory ToUser'});
        } else {
            res.json({ success: true, msg: 'WorkoutCategory ToUser successfully' });
        }
    });
};