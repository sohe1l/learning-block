const express = require('express');
const db = require('../model/database.js');
require('dotenv').config();
const routes = express.Router();

  // http://localhost:8080/learn/spanish/level/1/from/english
  //routes.route('/:target/level/:level/from/:native')
  routes.route('/languages')

  .get((req, res) => getLearn(req,res));

  
  async function getLearn(req, res){
    //const target = req.params.target;
    //const level = req.params.level;
    //const native = req.params.native;
    const level = 1;
    const native = 'English';
    // add level
    // const [words, fields] = await db.query("SELECT * FROM words ORDER BY RAND() LIMIT 0,5");

    // translate
    // Imports the Google Cloud client library
    // Imports the Google Cloud client library
    const Translate = require('@google-cloud/translate');

    // Creates a client
    const translate = new Translate();

    // Lists available translation language with their names in English (the default).
    translate
      .getLanguages()
      .then(results => {
        const languages = results[0];

        console.log('Languages:');
        languages.forEach(language => console.log(language));
      })
      .catch(err => {
        console.error('ERROR:', err);
      });


    //var results = [];

    res.render('learn', {results: translation});
  }


module.exports = routes;