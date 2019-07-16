const Workout = require('../model/workoutModel');
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
exports.getWorkoutByCategory = function (req, res) {
    var workoutCategory= req.query.workoutCategory;
    if(workoutCategory == "HealthyMale" ){
        workoutCategory = "UnderWeightMale"
    }else if(workoutCategory == "HealthyFemale"){
        workoutCategory = "UnderWeightFemale"
    }else if(workoutCategory == "ObesityMale"){
        workoutCategory = "OverWeightMale"
    }else if(workoutCategory == "ObesityFemale"){
        workoutCategory = "OverWeightMale"
    }
    Workout.getWorkoutCategory(workoutCategory, (err, workouts) => {
        if (err) throw err;
        if (isEmptyObject(workouts)) {
            return res.json({ success: true, msg: 'Workouts not found for the dietcategory'});
        } else {
            res.json({
                success: true,
                workouts: workouts
            });
        }
    });
};

exports.addNewWorkout = function (req, res) {
    if(req.body.workouts){
        Workout.addManyWorkouts(req.body.workouts, (err, user) => {
            if(err){
                res.json({success: false, msg: 'Failed to add multiple workouts'});
            } else{
                res.json({success: true, msg: 'Workout added successfully'});
            }
        });
    } else {
        let newWorkout = new Workout(req.body);
        Workout.addNewWorkout(newWorkout, (err, user) => {
            if(err){
                res.json({success: false, msg: 'Failed to add new workout'});
            } else{
                res.json({success: true, msg:'Workout added successfully'});
            }
        });
    }
};

exports.listWorkoutsByText = function (req, res) {
    var allWorkoutNames = [];
    var selectedWorkoutsByText = [];    
    const searchText = req.query.searchedText;
    Workout.getAllWorkouts((err, workoutsList) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to list all workouts' });
        } else {
            workoutsList.forEach(element => {
                if(element.workoutInDetails){
                    element.workoutInDetails.forEach(subElement => {
                        if(subElement.name.indexOf(searchText) > -1){
                            allWorkoutNames.push(subElement.name); 
                        }                          
                    });  
                }                
            });
            res.json({ success: true, allWorkoutNames: allWorkoutNames });
        }
    });
};