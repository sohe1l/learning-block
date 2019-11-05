const express = require('express');
const db = require('../model/database.js');

const routes = express.Router();

routes.route('/')
  .get((req, res) => {
    res.render('dashboard');
  });


module.exports = routes;