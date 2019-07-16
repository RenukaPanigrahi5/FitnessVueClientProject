const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: false
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: false
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: [{
      type: String,
      enum: ['Male', 'Female']
    }]
  },
  address: {
    type: String,
    required: true
  },
  saltSecret: String
});

userSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

 

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
  const query = { username: username }
  User.findOne(query, callback);
}

/*module.exports.addUser = function (newUser, callback) {
  console.log("inside the addUser");
  bcrypt.genSalt(10, (err, salt) => {    
    bcrypt.hash(newUser.password, salt, (err, hash) => {      
      if (err) {        
        throw err;
      }
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}*/

userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
          this.password = hash;
          this.saltSecret = salt;
          next();
      });
  });
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};



module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getAllUsers = function (callback) {
  User.find({}, callback);
}

module.exports.removeUserDetails = function (username, callback) {
  User.findOneAndRemove({ username: username }, callback);
}

/*module.exports.getUserByEmail = function (email, callback) {
  const query = {email: email}
  User.findOne(query, callback);
}*/

module.exports.changePassword = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {    
    bcrypt.hash(newUser.password, salt, (err, hash) => {      
      if (err) {        
        throw err;
      }
      newUser.password = hash;
      User.findOneAndUpdate({_id: newUser._id}, {password: newUser.password}, {new: true}, callback);
    });
  });    
}

userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id},
      process.env.JWT_SECRET,
  {
      expiresIn: process.env.JWT_EXP
  });
}

mongoose.model('User', userSchema);