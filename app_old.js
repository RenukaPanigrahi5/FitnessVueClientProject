const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      passport = require('passport'),
      mongoose = require('mongoose'),
      config = require('./api/config/database'),
      errorhandler = require('errorhandler');
      
//userFindAndModify is default while doing
//findOneAndUpdate need to make false
mongoose.set('useFindAndModify', false);

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const users = require('./api/routes/usersRoutes'),
 dietSheet = require('./api/routes/dietSheetRoutes'),
 workout = require('./api/routes/workoutsRoutes'),
 trainer = require('./api/routes/trainerRoutes'),
 activity = require('./api/routes/activityRoutes');



// Port Number
const port = 8082;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

// Body Parser Middleware
app.use(bodyParser.json());
app.use(cors());
// Passport Middleware

app.use(passport.initialize());
app.use(passport.session());
app.use(errorhandler());


app.use('/fitnessapp/users', users);
app.use('/fitnessapp/dietSheet', dietSheet);
app.use('/fitnessapp/workout', workout);
app.use('/fitnessapp/trainer', trainer);
app.use('/fitnessapp/activity', activity);


// error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
      var valErrors = [];
      Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
      res.status(422).send(valErrors)
  }
  else{
      console.log(err);
  }
});

// Index Route
app.get('/fitnessapp', (req, res) => {
  res.send('Fitness APP is up and running : User correct endpoitn');
});


// Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
