const express = require('express');
const db = require('../model/database.js');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const routes = express.Router();
const {Translate} = require('@google-cloud/translate').v2;
const projectID = 'learningblocks-258219'
const translate = new Translate({projectID});
  http://localhost:8080/learn/spanish/level/1/from/english
  routes.route('/:target/level/:level/from/:native')
  // .get((req, res) => getSpeech(req,res));
 //routes.route('/')
.get((req, res) => {getLearn(req,res)
res.render('learn');});

  
async function getLearn(req, res){
  const native = req.params.native;
    // add level
  const result =  await db.query("SELECT * FROM words ORDER BY RAND() LIMIT 0,5");
    for(i=0; i<result[0].length;i++){
      const text = result[0][i]['word'];
      const sentence = result[0][i]['sentence'];
      console.log(text);
      const translated = translateText(text, sentence, req.params.target);
      getSpeech(translated['text'], req.params.target, 'targetText');
      getSpeech(translated['sentence'], req.params.target, 'targetSentence');


    }
}

  async function translateText(text,sentence) {
    const target = 'ru';
    console.log(text);
    const [word_translation] = await translate.translate(text, target);
    console.log(`Word Translation: ${word_translation}`);
    const [sent_translation] = await translate.translate(sentence, target);
    console.log(`Sentence Translation: ${sent_translation}`);
    res.render('learn', {translation: word_translation});
    
  }

  async function getSpeech(text, language, TextType){
    const client = new textToSpeech.TextToSpeechClient();
    const request = {
      input: {text: text},
      // Select the language and SSML Voice Gender (optional)
      voice: {languageCode: lang_dict_speech[language], ssmlGender: 'NEUTRAL'},
      // Select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'},
    };
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    const filename = './public/audio/'.concat(TextType,'.mp3');
    // await writeFile('../../public/audio/'.concat(filename), response.audioContent, 'binary');
    await writeFile(filename, response.audioContent, 'binary');

    console.log('Audio content written to file');  

  };


  

    //var results = [];

module.exports = routes;