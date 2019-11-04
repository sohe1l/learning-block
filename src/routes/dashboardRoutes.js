const express = require('express');
const db = require('../model/database.js');

const dashboardRoutes = express.Router();

dashboardRoutes.route('/')
  .get((req, res) => {
    res.render('dashboard');
  });


module.exports = dashboardRoutes;