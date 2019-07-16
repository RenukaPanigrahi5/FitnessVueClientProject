const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ActivityLogSchema = mongoose.Schema({   
    email: {
        type: String,
        required: true
    },

    activity_name: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    }
   
});
const ActivityLog = module.exports = mongoose.model('ActivityLog', ActivityLogSchema);

module.exports.getActivitiesLogInfo = function(email, callback) {      
    ActivityLog.find({email: email}, callback);
}

module.exports.addActivityLog = function(newActivityLog, callback) {
    newActivityLog.save(callback);
}