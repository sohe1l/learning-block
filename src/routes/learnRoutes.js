const express = require('express');
const db = require('../model/database.js');
const routes = express.Router();

  // http://localhost:8080/learn/spanish/level/1/from/english
  //routes.route('/:target/level/:level/from/:native')
  routes.route('/languages')

  .get((req, res) => getLearn(req,res));

  
  function getLearn(req, res){
    const target = req.params.target;
    const native = req.params.native;
    //const level = req.params.level;
    //const native = 'English';
    // add level
    const [words, sentence, level] =  db.query("SELECT word, sentence, level FROM words ORDER BY RAND() LIMIT 0,5");
    console.log(`Words: ${words}`);
    // translate
    // Imports the Google Cloud client library
    const {Translate} = require('@google-cloud/translate').v2;
    const projectID = 'learningblocks-258219'
    
    // Instantiates a client
    const translate = new Translate({projectID});

    // The text to translate
    const text = words;

    // The target language
    //const target = 'ru';

    // Translates some text into Russian
    async function translateText() {
      
      const [translation] = await translate.translate(text, target);

      console.log(`Text: ${text}`);

      console.log(`Translation: ${translation}`);
      res.render('learn', {translation: translation});
    }
    translateText();

    //var results = [];

    
  }


module.exports = routes;