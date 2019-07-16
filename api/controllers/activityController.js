const Activity = require('../model/activityModel');
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
exports.getActivityInfoByEmail = function (req, res) { 
    var email = req.query.email;
    var labelsArray = [];
    var dataArray = [];
    const empty = '';
    Activity.getActivitiesInfo(empty, (err, activitiesInfo) => {
        if (err) {            
            return res.json({
                success: false,
                msg: 'there is some error ',
                error: err
            });
        }else if (isEmptyObject(activitiesInfo)) {
            console.log("activitiesInfo--"+ activitiesInfo);
            return res.json({
                success: false,
                msg: 'Activity not found for this category'
            });
        }
        else {
            console.log("activitiesInfo--"+ activitiesInfo);
            activitiesInfo.forEach(element => {
                if(element.email == email){
                    labelsArray.push(element.activity_day);
                    dataArray.push(element.disance)
                }                
            });
            res.json({
                success: true,
                labels: labelsArray,
                activityData: dataArray,
                activitiesInfo:activitiesInfo
            });
        }
    });
};

exports.newActivity = function (req, res) {
        let newActivity = new Activity(req.body);
        console.log("");
        Activity.addNewActivity(newActivity, (err, activity) => {
            console.log("inside addNewActivity"+ newActivity);
            if (err) {
                res.json({ success: false, msg: 'Failed to add new Activity', error: err });
            } else {
                res.json({ success: true, msg: 'Activity added successfully'});
            }
        });
};