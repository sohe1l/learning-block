const express = require('express');
const dotenv = require("dotenv").config({path:'.env'});
const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

//Static dict for supported languages
lang_dict_text = {
  'English': 'en',
  'Spanish': 'es',
  'Russian': 'ru',
  'Italian': 'it',
  'French' : 'fr',
  'German' : 'de',
  'Dutch'  : 'nl',
  'Arabic' : 'ar',
  'Chinese' : 'zh'
};
/* Morgan is used for logging http request in the console */
const morgan = require('morgan');

/* Debug is used for printing message on cosole in different categories.
Run "DEBUG=* node app.js" to get all message or run "DEBUG=app node app.js"
to get messages for this file only. */
const debug = require('debug')('app');


// will allow to get form submited data using request.body
app.use(bodyParser.urlencoded({ extended: false }));

// use express session
app.use(
  session({
    secret: 'CSC Class',
    saveUninitialized: false,
    resave: false,
  }),
);

// Auth
require('./src/config/passport.js')(app);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

function authProtect(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isBlocked === 1) {
      res.redirect('/contact/admin');
    } else {
      next();
    }
  } else {
    res.redirect('/auth/login');
  }
}

app.use(morgan('tiny'));

/* allows to call static items in pulic folder such as images */
app.use(express.static(path.join(__dirname,'public')));


/*keep static dictionary for language codes*/
lang_dict_speech = {
  'English': 'en-US',
  'Spanish': 'es-ES',
  'Russian': 'ru-RU',
  'Italian': 'it-IT',
  'French' : 'fr-FR',
  'German' : 'de-DE',
  'Dutch'  : 'nl-NL',
  'Arabic' : 'ar-XA',
  'Chinese' : 'cmn-CN'
};



// Define Routers
const homeRouter = require('./src/routes/homeRoutes');
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const learnRoutes = require('./src/routes/learnRoutes');
const evalRoutes2 = require('./src/routes/evalRoutes2');
const audioRoutes = require('./src/routes/audioRoutes');


// Use Routers
app.use('/', homeRouter);
app.use('/auth/', authRoutes);
app.use('/dashboard/', authProtect, dashboardRoutes);
app.use('/learn/', learnRoutes);
// TODO add authProtect middleware
// app.use('/eval/', evalRoutes); 
app.use('/eval2/', evalRoutes2); 
app.use('/audio/', audioRoutes); 

app.listen(8080, () => {
  debug('listening on port 8080');
});