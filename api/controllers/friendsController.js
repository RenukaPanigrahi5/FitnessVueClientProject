const Friends = require('../model/friendsModel');
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.addNewFriend = function (req, res) {
    let newFriend = new Friends(req.body);
    Friends.addNewFriend(newFriend, (err, friend) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add new Friend' });
        } else {
            res.json({ success: true, msg: 'Friend added successfully', friend: friend });
        }
    });
};

exports.listAllFriends = function (req, res) {

    Friends.getAllFriends((err, friends) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add list all friends' });
        } else {
            res.json({ success: true, friends: friends });
        }
    });
};

exports.removeFriend = function(req, res){
    Friends.removeFriend(req.query.email, (err, friend) => {
        if(err){
            res.json({success: false, msg: 'Failed to remove friend' +err});
        } else{
            res.json({success: true, msg: 'Friend removed successfully'});
        }    
    });
};
