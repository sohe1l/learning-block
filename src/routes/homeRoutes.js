const express = require('express');

const homeRoutes = express.Router();

homeRoutes.route('/')
  .get((req, res) => {
    res.render('home');
  });

module.exports = homeRoutes;