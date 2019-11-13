const express = require('express');
const dotenv = require("dotenv").config({path:'.env'});
const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
lang_dict_text = {
  'english': 'en',
  'spanish': 'es',
  'russian': 'ru',
  'italian': 'it',
  'french' : 'fr',
  'german' : 'de',
  'dutch'  : 'nl',
  'arabic' : 'ar',
  'mandarin chinese' : 'zh'
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
  'english': 'en-US',
  'spanish': 'es-ES',
  'russian': 'ru-RU',
  'italian': 'it-IT',
  'french' : 'fr-FR',
  'german' : 'de-DE',
  'dutch'  : 'nl-NL',
  'arabic' : 'ar-XA',
  'mandarin chinese' : 'cmn-CN'
};



// Define Routers
const homeRouter = require('./src/routes/homeRoutes');
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const learnRoutes = require('./src/routes/learnRoutes');
const evalRoutes = require('./src/routes/evalRoutes');



// Use Routers
app.use('/', homeRouter);
app.use('/auth/', authRoutes);
app.use('/dashboard/', authProtect, dashboardRoutes);
app.use('/learn/', authProtect, learnRoutes);
app.use('/eval/', authProtect, evalRoutes);

app.listen(8080, () => {
  debug('listening on port 8080');
});