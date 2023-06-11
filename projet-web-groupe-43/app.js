const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
var cookieParser = require('cookie-parser');

// use of sessions
const session = require('express-session')

// TODO Rename config.example.js to config.js and change your secret
// Then uncomment the following line 
// const config = require('./config');


var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');


// TODO Require your controllers here
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionsRouter = require('./routes/questions'); 
var membersRouter = require('./routes/members');

const app = express();
const port = 3000;

// Setup views folder and handlebar engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev')); // Log each request
app.use(express.urlencoded({ extended: false })); // Decode form values
app.use(express.static(path.join(__dirname, 'public'))); // Get static files from public folder


// Uncomment the following line when you have setup the config file
// app.use(session({ secret: config.secret, resave: false, saveUninitialized: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "Your secret key", resave: false, saveUninitialized:false}));


// TODO Call your controllers here
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/members', membersRouter);


// Create error on page not found
app.use((req, res, next) => next(createError(404)) ); 

// Show error hbs page
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', { error });
});

// Launch server
app.listen(port, () => console.log('App listening on port ' + port) );
