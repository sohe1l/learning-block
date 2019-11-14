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
  resultset ={};
  const result =  await db.query("SELECT * FROM words where words.level = ? ORDER BY RAND() limit 0,5", [level]);
    
  for(i=0; i<result[0].length;i++)
    {
      var text = result[0][i]['word'];
      var sentence = result[0][i]['sentence'];
      var image = result[0][i]['image'];
      if(native!='English')
      {
        nativeCode = lang_dict_text[native];
        trans_text = await translateText(text,nativeCode);
        trans_sentence = await translateText(sentence, nativeCode);
      };
      
      const translateWord = await translateText(text, targetCode);
      const translateSentence = await translateText(sentence, targetCode);
      if(native!='English')
      {
        resultset[i] = {'word':trans_text, 'sentence':trans_sentence, 'image':image, 'translatedWord':translateWord, 'translatedSentence':translateSentence};
      }
      else{
        resultset[i] = {'word':text, 'sentence':sentence, 'image':image, 'translatedWord':translateWord, 'translatedSentence':translateSentence};

      }
    };
    
  async function translateText(totranslate, target) {
    
    return new Promise((resolve, reject) => {
      googleTranslateLearn.translate(totranslate, target, function (err, translation) {
      return resolve(translation.translatedText);
       });
    });

  };
  res.render('learn', {resultset:resultset});
};

module.exports = routes;