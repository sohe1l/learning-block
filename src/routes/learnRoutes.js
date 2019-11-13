<<<<<<< Updated upstream
const express = require('express');
const db = require('../model/database.js');
const routes = express.Router();
<<<<<<< Updated upstream
const {Translate} = require('@google-cloud/translate').v2;
const projectID = 'learningblocks-258219'
const translate = new Translate({projectID});
  // http://localhost:8080/learn/spanish/level/1/from/english
  //routes.route('/:target/level/:level/from/:native')
routes.route('/languages')
=======
const googleTranslateLearn = require('google-translate')(process.env.TRANSLATE_KEY, {});
const wordArr = [];
const sentenceArr = [];
const imageArr = [];
routes.route('/:target/level/:level/from/:native')                //http://localhost:8081/learn/Spanish/level/1/from/English

>>>>>>> Stashed changes
.get((req, res) => getLearn(req,res));

  
async function getLearn(req, res){
<<<<<<< Updated upstream
  const native = req.params.native;
    //const level = req.params.level;
    //const native = 'English';
    // add level
  const result =  await db.query("SELECT * FROM words ORDER BY RAND() LIMIT 0,5");
    for(i=0; i<result[0].length;i++){
      const text = result[0][i]['word'];
      const sentence = result[0][i]['sentence'];
      console.log(text);
      translateText(text, sentence);
    }
}

  async function translateText(text,sentence) {
    const target = 'ar';
    console.log(text);
    const [word_translation] = await translate.translate(text, target);
    console.log(`Word Translation: ${word_translation}`);
    const [sent_translation] = await translate.translate(sentence, target);
    console.log(`Sentence Translation: ${sent_translation}`);
    //res.render('learn', {translation: word_translation});
    const target1 = 'en'
    const [converted] = await translate.translate(word_translation, target1);
    console.log(`converted: ${converted}`);
=======
import { Router } from 'express';
import db from '../model/database.js';

const routes = Router();

  // http://localhost:8080/learn/spanish/level/1/from/english
  //routes.route('/:target/level/:level/from/:native')
  routes.route('/:target/from/english')

  .get((req, res) => getLearn(req,res));

  
  async function getLearn(req, res){
    //const target = req.params.target;
    //const level = req.params.level;
    //const native = req.params.native;
=======
  var native = req.params.native;
  var target = req.params.target;
  const level = req.params.level;
  const targetCode = lang_dict_text[target];
  
  const result =  await db.query("SELECT * FROM words where words.level = ? ORDER BY RAND()", [level]);
    
  for(i=0; i<result[0].length;i++)
    {
      var text = result[0][i]['word'];
      var sentence = result[0][i]['sentence'];
      var image = result[0][i]['image'];
      if(native!='English')
      {
        text = translateText(text,'en');
        sentence = translateText(sentence, 'en');
        console.log("not native");
      };
      const translateWord = await translateText(text, targetCode);
      const translateSentence = await translateText(sentence, targetCode);
     
      wordArr.push(translateWord);
      sentenceArr.push(translateSentence);
      imageArr.push(image);
    };
 
  async function translateText(totranslate, target) {
>>>>>>> Stashed changes
    
    // add level
    // const [words, fields] = await db.query("SELECT * FROM words ORDER BY RAND() LIMIT 0,5");

    // translate
    // Imports the Google Cloud client library
    const Translate = require('@google-cloud/translate');

    // Your Google Cloud Platform project ID
    const projectId = 'learningblocks-258219';

    // Instantiates a client
    const translate = new Translate({
    projectId: projectId,
    });

<<<<<<< Updated upstream
    // The text to translate
    const text = 'Hello, world!';
    // The target language
    const target = 'ru';

    // Translates some text into Russian
    translate
      .translate(text, target)
      .then(results => {
      const translation = results[0];

      console.log(`Text: ${text}`);
      console.log(`Translation: ${translation}`);
      })
      .catch(err => {
      console.error('ERROR:', err);
      });


    //var results = [];

    res.render('learn', {translation: translation});
>>>>>>> Stashed changes
  }

    //var results = [];
=======
  };
  resultset = {'text':wordArr, 'sentence':sentenceArr, 'image': imageArr};
  res.render('learn', {resultset:resultset});
};
>>>>>>> Stashed changes

export default routes;