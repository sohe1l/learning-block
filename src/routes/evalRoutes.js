const express = require('express');
const db = require('../model/database.js');
const routes = express.Router();
const googleTranslate = require('google-translate')(process.env.TRANSLATE_KEY, {});

/**
 * Sample url for eval:
 * http://localhost:8080/eval/spanish/level/1/from/english
 */
routes.route('/:target/level/:level/from/:native')
  .get((req, res) => {
    getTest(req, res);
    res.render('eval');
  });



async function getEval(req, res) {
  const target = req.params.target;
  const level = req.params.level;
  const native = req.params.native;
  const target_lang = lang_dict_text[target]; //target_lang:es target:spanish

  console.log(target_lang);

  // array of words for the test
  // each index will have following object:
  // {words:[a,b,c,d], answer:b, img:http://img.jpg}
  const questions = [];

  const words4API = []
  const word2Img = {};

  const [result, _] = await db.query("SELECT * FROM words where words.level = ? ORDER BY RAND() LIMIT 0,8", [level]);
  for (i = 0; i < result.length; i++) {
    const image = result[i]['image'];
    const word = result[i]['word'];
    words4API.push(word);
    word2Img[word] = image;
  };

  // [{translatedText: 'bolígrafo',detectedSourceLanguage: 'en',originalText: 'pen'},..]
  const translatedWords = await translateTextBulk(words4API, target_lang);

  var i = 0;
  while (i < translatedWords.length) {
    const randI = i + Math.floor(Math.random() * 4);
    console.log(randI);
    questions.push({
      words: [
        translatedWords[i].translatedText,
        translatedWords[i + 1].translatedText,
        translatedWords[i + 2].translatedText,
        translatedWords[i + 3].translatedText],
      answer: translatedWords[randI].translatedText,
      img: word2Img[translatedWords[randI].originalText],
    });
    i += 4;
  }

  res.send(questions);


  //console.log(word);
  // res.render('test', { resultset: resultset });
};

async function translateTextBulk(textArr, target) {
  return new Promise((resolve, reject) => {
    googleTranslate.translate(textArr, target, function (err, translation) {
      return resolve(translation);
    });
  });
}

// Changes in the function to translate all words in a loop.
async function translateText(text, target) {



  target = lang_dict_text[target];
  console.log(text);
  const [word_translation] = await translate.translate(text, target);
  console.log(`Word Translation: ${word_translation}`);
};

//End of test screen
routes.route('/:target/level/:level/from/:native/replay')
.get((req, res) => {
  res.render('eval/replay');
});

module.exports = routes;
