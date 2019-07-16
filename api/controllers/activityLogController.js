const ActivityLog = require('../model/activityLogModel');
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
exports.getActivityInfoByEmail = function (req, res) { 
    var email = req.query.email;
    var labelsArray = [];
    var dataArray = [];
    ActivityLog.getActivitiesLogInfo(email, (err, activitiesLogInfo) => {
        if (err) {            
            return res.json({
                success: false,
                msg: 'there is some error ',
                error: err
            });
        }else if (isEmptyObject(activitiesLogInfo)) {
            console.log("activitiesLogInfo--"+ activitiesLogInfo);
            return res.json({
                success: false,
                msg: 'Activity not found for this category'
            });
        }
        else {
            console.log("activitiesInfo--"+ activitiesLogInfo);
            activitiesLogInfo.forEach(element => {
                if(element.email == email){
                    labelsArray.push(element.activity_name);
                    dataArray.push(element.duration)
                }                
            });
            res.json({
                success: true,
                labels: labelsArray,
                activityData: dataArray
            });
        }
    });
};

exports.newActivityLog = function (req, res) {
        let newActivityLog = new ActivityLog(req.body);
        console.log("");
        ActivityLog.addActivityLog(newActivityLog, (err, activityLog) => {
            console.log("inside addNewActivity"+ activityLog);
            if (err) {
                res.json({ success: false, msg: 'Failed to add new Activity', error: err });
            } else {
                res.json({ success: true, msg: 'ActivityLog added successfully'+ activityLog});
            }
        });
};