const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const FriendsSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Kindly enter the friend_name'
    },
    email: {
        type: String,
        required: 'Kindly enter the email',
        unique: true,
        dropDups: false
    }

});

const Friends = module.exports = mongoose.model('Friends', FriendsSchema);
module.exports.addNewFriend = function(newFriend, callback)
{
    newFriend.save(callback);
}

module.exports.getAllFriends = function(callback)
{
    Friends.find({}, callback);
}


module.exports.removeFriend = function(email,callback)
{
    Friends.findOneAndRemove({email: email}, callback);
}