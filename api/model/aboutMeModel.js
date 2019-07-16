const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const AboutSchema = mongoose.Schema({
    About: {
      type: String
    },
    phonenumber: {
      type: String
    },
    email: {
      type: String
    }
  });
  const About = module.exports = mongoose.model('About', AboutSchema);
