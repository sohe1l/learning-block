const express = require('express');
const db = require('../model/database.js');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const routes = express.Router();
const googleTranslateLearn = require('google-translate')(process.env.TRANSLATE_KEY, {});

routes.route('/:target/level/:level/from/:native')                //http://localhost:8081/learn/Spanish/level/1/from/English

.get((req, res) => getLearn(req,res));

async function getLearn(req, res){
  var native = req.params.native;
  var target = req.params.target;
  const level = req.params.level;
  const targetCode = lang_dict_text[target];
  const userWord = [];
  const result =  await db.query("SELECT * FROM words where words.level = ? ORDER BY RAND()", [level]);
    
  for(i=0; i<result[0].length;i++)
    {
      var text = result[0][i]['word'];
      var sentence = result[0][i]['sentence'];
      if(native!='English')
      {
        text = translateText(text,'en');
        sentence = translateText(sentence, 'en');
        console.log("not native");
      };
      
      const translateWord = await translateText(text, targetCode);
      const translateSentence = await translateText(sentence, targetCode);
      console.log(translateWord);
      console.log(translateSentence);

    };
    

  async function translateText(totranslate, target) {
    
    return new Promise((resolve, reject) => {
      googleTranslateLearn.translate(totranslate, target, function (err, translation) {
      return resolve(translation.translatedText);
    });
  });

  };
};

module.exports = routes;
