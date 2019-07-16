const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ActivitySchema = mongoose.Schema({   
    email: {
        type: String,
        required: true
    },  
    disance: {
        type: Number,
        required: true
    },
    activity_day: {
        type: String,
        required: 'true',
    }
});
const Activity = module.exports = mongoose.model('UserActivity', ActivitySchema);

module.exports.getActivitiesInfo = function(query, callback) {      
    Activity.find({}, callback);
}
module.exports.addNewActivity = function(newActivity, callback){
    newActivity.save(callback);
}