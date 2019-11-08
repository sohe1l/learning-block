const express = require('express');
const db = require('../model/database.js');
const routes = express.Router();
const {Translate} = require('@google-cloud/translate').v2;
const projectID = 'learningblocks-258219'
const translate = new Translate({projectID});
  // http://localhost:8080/learn/spanish/level/1/from/english
  //routes.route('/:target/level/:level/from/:native')
routes.route('/languages')
.get((req, res) => getLearn(req,res));

  
async function getLearn(req, res){
  const native = req.params.native;
  const level = req.params.level;
  const result =  await db.query("SELECT * FROM words ORDER BY RAND() LIMIT 0,5");
    for(i=0; i<result[0].length;i++){
      const text = result[0][i]['word'];
      const sentence = result[0][i]['sentence'];
      console.log(text);
      if(native!='English')
      {

      }
      translateText(text, sentence, res);
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
  }

    //var results = [];

module.exports = routes;