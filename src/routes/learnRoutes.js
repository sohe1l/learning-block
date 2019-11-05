const express = require('express');
const db = require('../model/database.js');

const routes = express.Router();

  // http://localhost:8080/learn/spanish/level/1/from/english
  routes.route('/:target/level/:level/from/:native')
  .get((req, res) => getLearn(req,res));

  
  async function getLearn(req, res){
    const target = req.params.target;
    const level = req.params.level;
    const native = req.params.native;
    
    // add level
    // const [words, fields] = await db.query("SELECT * FROM words ORDER BY RAND() LIMIT 0,5");

    // translate
    var results = [];

    res.render('learn', {results: results});
  }


module.exports = routes;