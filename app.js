const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

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
app.use(express.static('./public'));

// Define Routers
const homeRouter = require('./src/routes/homeRoutes');
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const learnRoutes = require('./src/routes/learnRoutes');
const evalRoutes = require('./src/routes/evalRoutes');
const speechRoutes = require('./src/routes/textSpeechRoute');



// Use Routers
app.use('/', homeRouter);
app.use('/auth/', authRoutes);
app.use('/dashboard/', authProtect, dashboardRoutes);
app.use('/learn/', authProtect, learnRoutes);
app.use('/eval/', authProtect, evalRoutes);
app.use('/learn/speech/', speechRoutes);

app.listen(8080, () => {
  debug('listening on port 8080');
});