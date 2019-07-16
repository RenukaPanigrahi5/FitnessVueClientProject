const User = require('../model/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const _ = require('lodash');

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

/*exports.addNewUser = function (req, res) {
    const email = req.body.email;   
    let newUser = new User(req.body);
    console.log("addNewUser"+ email);
    User.addUser(newUser, (err, user) => {
        if (err) {   
            console.log("addNewUser"+ email);
            res.json({ success: false, msg: 'Failed to register user', error:err });
        } else {      
            console.log("addNewUser else "+ email);     
            return res.status(201).send({ id_token: createToken(email) });
        }
    });
};*/

exports.register = (req, res, next) => {
    let newUser = new User(req.body);
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

exports.isUserExists = function (req, res) {
    const email = req.body.email;
    User.getUserByEmail(username, (err, user) => {
        if (err) {

        }else if (user) {

            res.status(200).send(" User exists already with "+ email);
        }
    });
};

/*exports.authenticateUser = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log("email "+ email);
    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            console.log("User Not Found");
            return res.json({ success: false, msg: 'User not found' });            
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                return res.json({ success: false, error: err });     
            }
            if (isMatch) {
                console.log("Password matched"+ email)
                res.status(201).send({ 
                                        success: true,
                                        id_token: createToken(email),
                                        user:_.pick(user,['fullName', 'email', 'username', 'height', 'weight','age', 
                                                            'gender', 'address'])}
                                    );
            } else {
                console.log("Password not matched");
                res.json({ success: false, msg: 'Wrong Password' });    
            }

        });
    });
};*/

exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

exports.listAllUsers = function (req, res) {
    User.getAllUsers(req, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to listAll users' });
        } else {
            res.json({
                success: true,
                msg: 'User listed successfully',
                users: user

            });
        }
    });
};

exports.removeUserDetails = function (req, res) {
    User.removeUserDetails(req.body.username, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to Remove users' + err });
        } else {
            res.json({
                success: true,
                msg: 'User removed successfully'

            });
        }
    });
};

/*exports.getUserProfileByEmail = function (req, res) {
    const email = req.query.email;
    
    console.log("email-- "+ email);
    User.getUserByEmail(email,(err, user) => {
       console.log("getUserProfileByEmail user--"+ user);
       if(err) {
            return res.status(404).json({success: false, message: " Could not get the User Profile ", error: err});
       } else if(!user) {
            return res.status(404).json({success: false, message: "User record not found"});
       } else {
            return res.status(200).json({success: true, user:_.pick(user,['_id','fullName', 'email', 'username', 'height', 'weight','age', 'gender', 'address'])});
       }   
    });

};*/

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}

/*function createToken(user) {
    const token = jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
    console.log("token in the server for user "+ token);
    return token;
}*/

exports.changePassword = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log("email"+ email +"   password      "+ password + "    confirmPassword   "+confirmPassword);    
    if(password == confirmPassword){       
        User.getUserByEmail(email, (err, existingUser) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to  update password', error: err });
            } else if(existingUser) {
                existingUser.password = confirmPassword;
                User.changePassword(existingUser, (err, updatedUser) => {
                    if (err) {
                        res.json({ success: false, msg: 'Failed to  update password', error: err });
                    } else if(updatedUser) {                        
                        res.json({ success: true,  msg: 'Password changed successfully', updatedUser: updatedUser });
                    }
                });               
            }
        });
    }else{
        res.json({ success: false, msg: 'Password Mismatched'});
    }    
};