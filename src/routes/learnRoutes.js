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
    //const level = 1;
    //const native = 'English';
    // add level
    // const [words, fields] = await db.query("SELECT * FROM words ORDER BY RAND() LIMIT 0,5");

    // translate
    // Imports the Google Cloud client library
    const {Translate} = require('@google-cloud/translate');
    const projectID = "learningblocks-258219"
    // Instantiates a client
    const translate = new Translate({projectID});

    // The text to translate
    const text = 'Hello, world!';

    // The target language
    const target = 'ru';

    // Translates some text into Russian
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);

    //var results = [];

    //res.render('learn', {results: translation});
  }


module.exports = routes;