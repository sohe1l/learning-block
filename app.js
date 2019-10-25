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

app.use(morgan('tiny'));

/* allows to call static items in pulic folder such as images */
app.use(express.static('./public'));

// Define Routers
const homeRouter = require('./src/routes/homeRoutes');

// Use Routers
app.use('/', homeRouter);

app.listen(8080, () => {
  debug('listening on port 8080');
});