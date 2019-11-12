const express = require('express');
const db = require('../model/database.js');
const routes = express.Router();
const {Translate} = require('@google-cloud/translate').v2;
const projectID = 'learningblocks-258219'
const translate = new Translate({projectID});
  http://localhost:8080/eval/spanish/level/1/from/english
routes.route('/:target/level/:level/from/:native')
  // .get((req, res) => getSpeech(req,res));
 //routes.route('/')

.get((req, res) => getTest(req,res));
  
async function getTest(req, res){
  
  var target = req.params.target;
  const level = req.params.level;
  const target_lang = lang_dict_text[target];
  const result =  await db.query("SELECT * FROM words where words.level = level ORDER BY RAND() LIMIT 0,5");
    for(i=0; i<result[0].length;i++)
    {
      const image = result[0][i]['image'];
      const word = result[0][i]['word'];

      // Need to write the logic for randomizing words from result[0]
      // need to translate all the words to target lang
      // maybe to put all words in an array and then pass to the api call.


      const translated = translateText(word[] target_lang);
      
      const sessionname = req.sessionID;
      var resultset = [word1, word2, word3, word4];
      res.render('test', {resultset:resultset});

    };

// Changes in the function to translate all words in a loop.
  async function translateText(word[],target) {
    target = lang_dict_text[target];
    console.log(text);
    const [word_translation] = await translate.translate(text, target);
    console.log(`Word Translation: ${word_translation}`);
    const [sent_translation] = await translate.translate(sentence, target);
    console.log(`Sentence Translation: ${sent_translation}`);
  };

};

module.exports = routes;
