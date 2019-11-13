const express = require('express');
const db = require('../model/database.js');
const routes = express.Router();
// const { Translate } = require('@google-cloud/translate').v2;
// const projectID = 'learningblocks-258219'
// const translate = new Translate({ projectID });

var googleTranslate = require('google-translate')(process.env.TRANSLATE_KEY, {});

/**
 * Sample url for eval:
 * http://localhost:8080/eval/spanish/level/1/from/english
 */
routes.route('/:target/level/:level/from/:native')
  .get((req, res) => getTest(req, res));


async function getTest(req, res) {
  const target = req.params.target;
  const level = req.params.level;
  const native = req.params.native;
  const target_lang = lang_dict_text[target]; //target_lang:es target:spanish


  // googleTranslate.translate('My name is Brandon', 'es', function(err, translation) {
  //   console.log(translation.translatedText);
  //   // =>  Mi nombre es Brandon
  // });


  const [result, _] = await db.query("SELECT * FROM words where words.level = ? ORDER BY RAND() LIMIT 0,5", [level]);
  for (i = 0; i < result.length; i++) {
    const image = result[i]['image'];
    const word = result[i]['word'];


    // translateText(word, target);

    //console.log(word);


    // Need to write the logic for randomizing words from result[0]
    // need to translate all the words to target lang
    // maybe to put all words in an array and then pass to the api call.


    // const translated = translateText(word, target_lang);

    // const sessionname = req.sessionID;
    // var resultset = [word1, word2, word3, word4];
    // res.render('test', { resultset: resultset });

  };

  res.send('D');


};


// Changes in the function to translate all words in a loop.
async function translateText(text, target) {
  target = lang_dict_text[target];
  console.log(text);
  const [word_translation] = await translate.translate(text, target);
  console.log(`Word Translation: ${word_translation}`);
};

module.exports = routes;
