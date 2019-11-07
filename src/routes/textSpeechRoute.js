const express = require('express');

const speechRoutes = express.Router();

speechRoutes.route('/learn/speech')
  .get((req, res) => {
    res.render('/learn/speech');
  });

module.exports = speechRoutes;