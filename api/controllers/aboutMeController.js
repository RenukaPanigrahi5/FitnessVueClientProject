const User = require('../model/userModel');
//const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.updatePage = function (req, res) {
    let page = new About(req.body);
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ json: true, msg: 'User registered successfully' });
        }
    });
};